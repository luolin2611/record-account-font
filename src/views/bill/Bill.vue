<template>
    <div class="main">
        <bill-header :title="'账单'" @chileToParentSelectDate="selectDate" :serveDate="serveDate">
        </bill-header>

        <!-- 1.图表区域 -->
        <div style="display: flex;justify-content: center;width: 100%;">
            <div class="charts-area">
                <div class="income-extends-area">
                    <div @click="selectExpenseIncomeBtn('expense')">
                        <i v-if="billType === '1'" class="iconfont"
                            :class="selectExpenseIncome == 'expense' ? 'icon-selected-radio' : 'icon-unselected-radio'"
                            :style="selectExpenseIncome == 'expense' ? 'color:#ed7773' : ''"></i>
                        <i v-if="billType === '0'" class="iconfont icon-selected-radio"
                            style="color:#ed7773; font-size: .3rem;"></i>
                        <p>{{this.billType == '0' ? '年' : this.billType == '1' ? '月' : '总'}}支出</p>
                        <p style="color: #ed7773; font-weight: 700;">￥{{expense}}</p>
                    </div>
                    <div @click="selectExpenseIncomeBtn('income')">
                        <i v-if="billType === '1'" class="iconfont"
                            :class="selectExpenseIncome == 'income' ? 'icon-selected-radio' : 'icon-unselected-radio'"
                            :style="selectExpenseIncome == 'income' ? 'color:#4eab7f' : ''"></i>
                        <i v-if="billType === '0'" class="iconfont icon-selected-radio"
                            style="color:#4eab7f; font-size: .3rem;"></i>
                        <p>{{this.billType == '0' ? '年' : this.billType == '1' ? '月' : '总'}}收入</p>
                        <p style="color: #4eab7f; font-weight: 700;">￥{{income}}</p>
                    </div>
                </div>
                <div style="width: 100%;box-shadow: -5px 5px 10px -4px #dfdfdf, 5px 5px 10px -4px #dfdfdf;">
                    <!-- 显示月账单柱状图图 -->
                    <bill-charts v-if="billType === '1'" style="height: 6rem; width: 100%;" :list="echartsDataList"
                        :selectExpenseIncome="selectExpenseIncome"></bill-charts>
                    <!-- 显示年账单折线图 -->
                    <year-broke-line v-if="billType === '0'" style="height: 6rem; width: 100%;"
                        :list="yearBrokenLineList" :selectExpenseIncome="selectExpenseIncome"></year-broke-line>
                </div>
            </div>
        </div>

        <div class="bill-type-desc">
            <p class="bill-type-title">{{this.billType == '0' ? '年度' : this.billType == '1' ? '月度' : ''}}账单明细</p>
            <p v-if="billType === '0'" class="per">共结余：{{totalSurplus}} 元</p>
        </div>

        <!-- 显示内容区 -->
        <div style="margin-top: .3rem; margin-left: .3rem;padding-bottom: 1.3rem;">
            <van-list v-model="isLoading" @load="onLoad" :finished="isFinished" :immediate-check="false"
                finished-text="别想了，没数据了">
                <template v-if="monthBillDetailList.length">
                    <record-day-item v-for="(item, index) in monthBillDetailList" :key="index" :dayItem="item">
                    </record-day-item>
                </template>
                <template v-else-if="yearBillDetailList.length">
                    <year-item v-for="(item, index) in yearBillDetailList" :key="index" :yearItem="item"></year-item>
                </template>
                <template v-else>
                    <div class="bill-no-data">
                        <img src="@/assets/img/bill_no_data.png" />
                        <p>每一笔账单，都是生活的点滴</p>
                    </div>
                </template>
            </van-list>
        </div>

        <!-- 底部tabbar 部分 -->
        <tab-bar :selectIndex="1"></tab-bar>
    </div>
</template>
<script>
    import TabBar from '@/components/TabBar.vue'
    import BillHeader from '@/components/Header.vue'
    import RecordDayItem from '@/components/RecordDayItem.vue'
    import BillCharts from './components/BillCharts.vue'
    import YearBrokeLine from './components/YearBrokeLine.vue'
    import { mapGetters } from 'vuex'
    import { querySysTime, queryBillInfo, queryMonthIncomeExpenseList, queryYearBrokeLineList } from '@/api/api'
    import YearItem from './components/YearItem.vue'
    import { Toast, List, Cell } from 'vant'
    export default {
        name: 'Bill',
        components: {
            TabBar,
            BillHeader,
            RecordDayItem,
            BillCharts,
            YearBrokeLine,
            YearItem,
            VanList: List,
            VanCell: Cell
        },
        data() {
            return {
                selectExpenseIncome: 'expense', //选择的是支出还是收入
                monthBillDetailList: [], //如果是月账单是填充此参数
                yearBillDetailList: [], //年度账单列表
                billType: '1',// 传输后台的 查询账单类型 0-年,1-月,2-时间段
                year: 0, //存放当前年
                month: 0, //当前月
                dateType: 'month', //用户选择的 账单类型  默认为月 （月、年、自定义）
                expense: 0, //支出
                income: 0, //收入
                echartsDataList: [],
                serveDate: {},
                isLoading: false,
                isFinished: false,
                startPage: 1, //当前页面
                pageSize: 20, //数据大小
                // 共结余
                totalSurplus: 0,
                yearBrokenLineList: {
                    incomeList: [],
                    expenseList: []
                }
            }
        },
        methods: {
            //选择收支按钮
            selectExpenseIncomeBtn(value) {
                if (this.billType === '0') {
                    // 年账单不需要点击事件
                    return;
                }
                if (this.selectExpenseIncome == value) {
                    return;
                }
                this.selectExpenseIncome = value;
                //选择不同的方式后需要更新当前请求的列表
                this.queryMonthIncomeExpenseList({
                    getCache: false,
                    setCache: true
                });
            },

            /**
             * 获取当前系统时间 -- 用来获取当前最新的年月日
             */
            querySysTime() {
                querySysTime({
                    getCache: false,
                    setCache: true
                }).then(res => {
                    if (res) {
                        if (res.code == '0000') {
                            let body = res.body;
                            this.year = body.year;
                            this.month = body.month;
                            this.day = body.day;
                            this.serveDate = { ...body }
                            // 获取当前日期的月账单列表[{date,data}]
                            this.queryMonthIncomeExpenseList();
                            // 获取到当前日期后，进行下一步获取账单信息
                            this.billInfoList();
                        } else {
                            Toast(res.msg);
                        }
                    }
                });
            },

            /**
             * 获取账单信息列表
             */
            billInfoList(param) {
                let user = this.getUser || null;
                if (user) {
                    // 用户已经登录，查询首页信息
                    queryBillInfo({
                        userId: user.userId,
                        billType: this.billType,
                        year: this.year,
                        month: this.year + '' + (this.month < 10 ? '0' + this.month : this.month), //eg: 202103
                        startPage: this.startPage,
                        pageSize: this.pageSize,
                        ...param
                    }).then(res => {
                        if (res) {
                            if (res.code == '0000') {
                                let body = res.body;
                                let type = this.billType;
                                this.expense = body.expense;
                                this.income = body.income;
                                if (type == '0') {
                                    //填充年账单
                                    this.yearBillDetailList = body.yearBillDetail.yearBillDetailObjectList || [];
                                    this.totalSurplus = body.yearBillDetail.totalSurplus || [];
                                    this.isFinished = true;
                                    this.startPage = 1;
                                }
                                if (type == '1') {
                                    //填充月账单
                                    this.totalSurplus = 0;
                                    let monthBillDetailList = body.monthBillDetailList || [];
                                    if (body.total == this.pageSize) {
                                        // 说明请求的数据大小满足，或许有下一页 当前的startPage + 1
                                        this.startPage += 1;
                                    } else {
                                        this.isFinished = true;
                                    }
                                    this.monthBillDetailList.push.apply(this.monthBillDetailList, monthBillDetailList);
                                }
                                if (type == '2') {
                                    //填充自定义账单
                                }
                            } else {
                                Toast(res.msg);
                            }
                        }
                        //关闭加载框
                        this.isLoading = false;
                    });
                }
            },

            /**
             * 子组件返回的日期
             */
            selectDate(obj) {
                this.resetStatus();
                // 选择的是月账单
                if (obj.type == 'month') {
                    this.year = obj.year;
                    this.month = obj.month;
                    this.billType = '1';
                    // 时间变更了重新请求账单信息
                    this.queryMonthIncomeExpenseList();
                    this.billInfoList();
                }
                // 选择的是年账单
                if (obj.type == 'year') {
                    this.year = obj.year;
                    this.billType = '0';
                    //时间变更了重新请求账单信息
                    this.queryYearBrokeLineList();
                    this.billInfoList();
                }
            },

            /**
             * 查询月收入月支出列表 (柱状图)
             */
            queryMonthIncomeExpenseList(parmas) {
                let user = this.getUser || null;
                if (user) {
                    queryMonthIncomeExpenseList({
                        userId: user.userId,
                        type: this.selectExpenseIncome == 'expense' ? '0' : '1',
                        queryYearMonthTime: this.year + '' + (this.month < 10 ? '0' + this.month : this.month), //eg: 202103
                        ...parmas
                    }).then(res => {
                        if (res) {
                            if (res.code == '0000') {
                                let body = res.body;
                                this.echartsDataList = body.list;
                            } else {
                                Toast(res.msg);
                            }
                        }
                    });
                }
            },

            /**
             * 查询年账单折线图数据
             */
            queryYearBrokeLineList(parmas) {
                let user = this.getUser || null;
                if (user) {
                    queryYearBrokeLineList({
                        year: this.year,
                        ...parmas
                    }).then(res => {
                        if (res) {
                            if (res.code == '0000') {
                                this.yearBrokenLineList = res.body || { incomeList: [], expenseList: [] };
                            } else {
                                Toast(res.msg);
                            }
                        }
                    });
                }
            },

            /**
             * 上拉加载 
             */
            onLoad() {
                this.billInfoList({ showLoading: false })
            },

            /**
             * 当选则时间（年、月）或者选择收入支出的时候需要还原最初的状态
             */
            resetStatus() {
                this.monthBillDetailList = [];
                this.yearBillDetailList = [];
                this.startPage = 1;
                this.isFinished = false;
            }
        },
        created() {
            this.querySysTime();
        },
        computed: {
            ...mapGetters(['getUser'])
        },
    }
</script>
<style scoped>
    .charts-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -1rem;
        padding-top: .2rem;
        width: 95%;
        background: #fff;
    }

    .income-extends-area {
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: .4rem;
        padding: 0 .3rem;
    }

    .income-extends-area div {
        display: flex;
        align-items: center;
    }

    .income-extends-area div i {
        font-size: .4rem;
        padding-right: 2px;
    }

    .bill-type-desc {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: .4rem;
        margin-top: .3rem;
        margin-left: .3rem;
    }

    .bill-type-desc .per {
        color: #aeb1b6;
        font-size: .35rem;
        margin-right: .8rem;
    }

    .bill-no-data {
        margin-right: .3rem;
        margin-top: .5rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .bill-no-data img {
        width: 4rem;
    }

    .bill-no-data p {
        margin-top: .5rem;
        font-size: .35rem;
    }
</style>