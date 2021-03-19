<template>
    <div class="main">
        <bill-header :title="'账单'" @chileToParentSelectDate="selectDate"></bill-header>

        <!-- 1.图表区域 -->
        <div style="display: flex;justify-content: center;width: 100%;">
            <div class="charts-area">
                <div class="income-extends-area">
                    <div @click="selectExpenseIncomeBtn('expense')">
                        <i class="iconfont"
                            :class="selectExpenseIncome == 'expense' ? 'icon-selected-radio' : 'icon-unselected-radio'"
                            :style="selectExpenseIncome == 'expense' ? 'color:#ed7773' : ''"></i>
                        <p>{{this.billType == '0' ? '年' : this.billType == '1' ? '月' : '总'}}支出</p>
                        <p style="color: #ed7773; font-weight: 700;">￥{{expense}}</p>
                    </div>
                    <div @click="selectExpenseIncomeBtn('income')">
                        <i class="iconfont"
                            :class="selectExpenseIncome == 'income' ? 'icon-selected-radio' : 'icon-unselected-radio'"
                            :style="selectExpenseIncome == 'income' ? 'color:#4eab7f' : ''"></i>
                        <p>{{this.billType == '0' ? '年' : this.billType == '1' ? '月' : '总'}}收入</p>
                        <p style="color: #4eab7f; font-weight: 700;">￥{{income}}</p>
                    </div>
                </div>
                <div style="width: 100%;box-shadow: -5px 5px 10px -4px #dfdfdf, 5px 5px 10px -4px #dfdfdf;">
                    <!-- 显示插图 -->
                    <bill-charts style="height: 6rem; width: 100%;" :list="list"></bill-charts>
                </div>
            </div>
        </div>

        <div class="bill-type-desc">
            <p class="bill-type-title">{{this.billType == '0' ? '年度' : this.billType == '1' ? '月度' : ''}}账单明细</p>
        </div>

        <!-- 显示内容区 -->
        <div style="margin-top: .3rem; margin-left: .3rem;padding-bottom: 3rem;">
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
        </div>


        <!-- 底部tabbar 部分 -->
        <tab-bar :selectIndex="1"></tab-bar>
    </div>
</template>
<script>
    import TabBar from '@/components/TabBar.vue'
    import * as echarts from 'echarts'
    import BillHeader from '@/components/Header.vue'
    import RecordDayItem from '@/components/RecordDayItem.vue'
    import BillCharts from './components/BillCharts.vue'
    import { mapGetters } from 'vuex'
    import { querySysTime, queryBillInfo } from '@/api/api'
    import YearItem from './components/YearItem.vue'
    import { Toast } from 'vant'
    export default {
        name: 'Bill',
        components: {
            TabBar,
            BillHeader,
            RecordDayItem,
            BillCharts,
            YearItem,
        },
        data() {
            return {
                echarts: null, // echarts实例
                selectExpenseIncome: 'expense', //选择的是支出还是收入
                monthBillDetailList: [], //如果是月账单是填充此参数
                yearBillDetailList: [], //年度账单列表
                billType: '1',// 传输后台的 查询账单类型 0-年,1-月,2-时间段
                year: 0, //存放当前年
                month: 0, //当前月
                dateType: 'month', //用户选择的 账单类型  默认为月 （月、年、自定义）
                expense: 0, //支出
                income: 0, //收入
                list: [
                    {
                        time: '20200201',
                        value: 4845
                    },
                    {
                        time: '20200202',
                        value: 544
                    },
                    {
                        time: '20200203',
                        value: 744
                    },
                    {
                        time: '20200204',
                        value: 54121
                    },
                    {
                        time: '20200205',
                        value: 66854
                    },
                    {
                        time: '20200206',
                        value: 949
                    },
                    {
                        time: '20200207',
                        value: 877
                    },
                    {
                        time: '20200208',
                        value: 454
                    },
                    {
                        time: '20200209',
                        value: 877
                    },
                    {
                        time: '20200210',
                        value: 544
                    },
                    {
                        time: '20200211',
                        value: 254
                    },
                    {
                        time: '20200212',
                        value: 144
                    },
                    {
                        time: '20200213',
                        value: 555
                    },
                    {
                        time: '20200214',
                        value: 451
                    },
                    {
                        time: '20200215',
                        value: 668
                    },
                    {
                        time: '20200216',
                        value: 564
                    },
                    {
                        time: '20200217',
                        value: 654
                    },
                    {
                        time: '20200218',
                        value: 35
                    },
                    {
                        time: '20200219',
                        value: 84
                    },
                    {
                        time: '20200220',
                        value: 23
                    },
                    {
                        time: '20200221',
                        value: 455
                    },
                    {
                        time: '20200222',
                        value: 668
                    },
                    {
                        time: '20200223',
                        value: 54
                    },
                    {
                        time: '20200224',
                        value: 545
                    },
                    {
                        time: '20200225',
                        value: 121
                    },
                    {
                        time: '20200226',
                        value: 0
                    },
                    {
                        time: '20200227',
                        value: 345
                    },
                    {
                        time: '20200228',
                        value: 45
                    }
                ]
            }
        },
        methods: {
            //选择收支按钮
            selectExpenseIncomeBtn(value) {
                this.selectExpenseIncome = value;
            },

            /**
             * 获取当前系统时间
             */
            querySysTime() {
                querySysTime({
                    getCache: false,
                    setCache: false
                }).then(res => {
                    if (res) {
                        if (res.code == '0000') {
                            let body = res.body;
                            this.year = body.year;
                            this.month = body.month;
                            this.day = body.day;
                            // 获取到当前日期后，进行下一步获取账单信息
                            this.billTopInfo();
                        } else {
                            Toast(res.msg);
                        }
                    }
                });
            },

            /**
             * 获取账单首页顶部内容
             */
            billTopInfo() {
                let user = this.getUser || null;
                if (user) {
                    //请求前先清空数据
                    this.yearBillDetailList = [];
                    this.monthBillDetailList = [];
                    // 用户已经登录，查询首页信息
                    queryBillInfo({
                        userId: user.userId,
                        billType: this.billType,
                        year: this.year,
                        month: this.year + '' + (this.month < 10 ? '0' + this.month : this.month), //eg: 202103
                        startPage: 1,
                        pageSize: 10
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
                                }
                                if (type == '1') {
                                    //填充月账单
                                    this.monthBillDetailList = body.monthBillDetailList || [];
                                }
                                if (type == '2') {
                                    //填充自定义账单
                                }
                            } else {
                                Toast(res.msg);
                            }
                        }
                    });
                }
            },

            /**
             * 子组件返回的日期
             */
            selectDate(obj) {
                if (obj.type == 'month') {
                    // 选择的是月账单
                    this.year = obj.year;
                    this.month = obj.month;
                    this.billType = '1';
                    //时间变更了重新请求账单信息
                    this.billTopInfo();
                }
            },
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
        font-size: .4rem;
        margin-top: .3rem;
        margin-left: .3rem;
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