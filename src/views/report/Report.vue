<template>
    <div class="report-tab">
        <report-header :title="'报表'" @chileToParentSelectDate="selectDate"></report-header>

        <!-- 1.图表区域 -->
        <div style="display: flex;justify-content: center;width: 100%;">
            <div class="charts-area">
                <div class="expense-income-area">
                    <div class="expense-income-item">
                        <div @click="selectExpenseIncomeBtn('expense')">
                            <i class="iconfont"
                                :class="selectExpenseIncome == 'expense' ? 'icon-selected-radio' : 'icon-unselected-radio'"
                                :style="selectExpenseIncome == 'expense' ? 'color:#ed7773' : ''"></i>
                            <p>{{this.reportType == '0' ? '年' : this.reportType == '1' ? '月' : '总'}}支出</p>
                        </div>
                        <p class="text" style="color:#ec6564;font-weight: 600;">￥{{expense}}</p>
                    </div>
                    <div class="expense-income-item">
                        <div @click="selectExpenseIncomeBtn('income')">
                            <i class="iconfont"
                                :class="selectExpenseIncome == 'income' ? 'icon-selected-radio' : 'icon-unselected-radio'"
                                :style="selectExpenseIncome == 'income' ? 'color:#4eab7f' : ''"></i>
                            <p>{{this.reportType == '0' ? '年' : this.reportType == '1' ? '月' : '总'}}收入</p>
                        </div>
                        <p class="text" style="color: #4eab7f;font-weight: 600;">￥{{income}}</p>
                    </div>
                </div>
                <!-- 显示插图 -->
                <div style="width: 100%;box-shadow: -5px 5px 10px -4px #dfdfdf, 5px 5px 10px -4px #dfdfdf;">
                    <!-- 显示插图 -->
                    <report-charts style="height: 6rem; width: 8rem; width: 100%;" :list="reportInfoList"></report-charts>
                </div>
            </div>
        </div>

        <!-- 2.内容区域 -->
        <div class="content-area">
            <statistics-item v-for="(item, index) in reportInfoList" :statistics="item" :statColor="colors[index%4]"></statistics-item>
        </div>

        <tab-bar :selectIndex="2"></tab-bar>
    </div>
</template>
<script>
    import TabBar from '@/components/TabBar.vue'
    import ReportHeader from '@/components/Header.vue'
    import * as echarts from 'echarts'
    import ReportCharts from './component/ReportCharts.vue'
    import StatisticsItem from './component/StatisticsItem.vue'
    import { mapGetters } from 'vuex'
    import { querySysTime, queryReportInfo } from '@/api/api'
    import { Toast } from 'vant'
    export default {
        name: 'Report',
        components: {
            TabBar,
            ReportHeader,
            ReportCharts,
            StatisticsItem,
        },
        data() {
            return {
                selectExpenseIncome: 'expense', //选择的是支出还是收入
                reportType: '1',// 传输后台的 查询报表类型 0-年,1-月,2-时间段
                year: 0, //存放当前年
                month: 0, //当前月
                dateType: 'month', //用户选择的 报表类型  默认为月 （月、年、自定义）
                expense: 0, //支出
                income: 0, //收入
                reportInfoList: [],
                colors: ["#F9891E", "#E74E00", "#FFEC07 ", "#FFC30D"]
            }
        },
        methods: {
            //选择收支按钮
            selectExpenseIncomeBtn(value) {
                if (this.selectExpenseIncome == value) {
                    return;
                }
                this.selectExpenseIncome = value;
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
                            // 获取到当前日期后，进行下一步获取报表信息
                            this.queryReportInfo();
                        } else {
                            Toast(res.msg);
                        }
                    }
                });
            },

            /**
             * 子组件返回的日期
             */
            selectDate(obj) {
                if (obj.type == 'month') {
                    // 选择的是月账单
                    this.year = obj.year;
                    this.month = obj.month;
                    this.reportType = '1';
                    //时间变更了重新请求报表信息
                    this.queryReportInfo({
                        getCache: false,
                        setCache: true
                    });
                }
            },

            /**
             * 获取报表信息列表
             */
            queryReportInfo(param) {
                let user = this.getUser || null;
                if (user) {
                    // 用户已经登录，查询首页信息
                    queryReportInfo({
                        userId: user.userId,
                        type: this.selectExpenseIncome == 'expense' ? '0' : '1', //消费类型
                        reportType: this.reportType,
                        year: this.year,
                        month: this.year + '' + (this.month < 10 ? '0' + this.month : this.month), //eg: 202103
                        ...param
                    }).then(res => {
                        if (res) {
                            if (res.code == '0000') {
                                let body = res.body;
                                let type = this.reportType;
                                this.expense = body.expense;
                                this.income = body.income;
                                if (type == '0') {
                                    //填充年账单
                                }
                                if (type == '1') {
                                    //填充月账单
                                    this.reportInfoList = body.reportInfoList;
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

    .expense-income-area {
        display: flex;
        width: 100%;
        padding: 0 .3rem;
        justify-content: space-between;
        font-size: .4rem;
    }

    .expense-income-item div {
        display: flex;
    }

    .expense-income-item i {
        padding-right: .1rem;
    }

    .expense-income-item .text {
        padding-left: .3rem;
        margin-top: .1rem;
    }

    .content-area {
        padding-bottom: 1.6rem;
    }
</style>