<template>
    <div class="main">
        <bill-header :title="'账单'"></bill-header>

        <!-- 1.图表区域 -->
        <div style="display: flex;justify-content: center;width: 100%;">
            <div class="charts-area">
                <div class="income-extends-area">
                    <div @click="selectExpenseIncomeBtn('expense')">
                        <i class="iconfont"
                            :class="selectExpenseIncome == 'expense' ? 'icon-selected-radio' : 'icon-unselected-radio'"
                            :style="selectExpenseIncome == 'expense' ? 'color:#ed7773' : ''"></i>
                        <p>月支出</p>
                        <p style="color: #ed7773; font-weight: 700;">￥4,016.70</p>
                    </div>
                    <div @click="selectExpenseIncomeBtn('income')">
                        <i class="iconfont"
                            :class="selectExpenseIncome == 'income' ? 'icon-selected-radio' : 'icon-unselected-radio'"
                            :style="selectExpenseIncome == 'income' ? 'color:#4eab7f' : ''"></i>
                        <p>月收入</p>
                        <p style="color: #4eab7f; font-weight: 700;">￥16,700.00</p>
                    </div>
                </div>
                <!-- 显示插图 -->
                <bill-charts style="height: 6rem; width: 100%;" :list="list"></bill-charts>
                <!-- <div style="height: 6rem; width: 8rem;" ref="echarts"></div> -->
            </div>
        </div>

        <!-- 显示内容区 -->
        <div v-if="true" style="margin-top: .3rem; margin-left: .3rem;padding-bottom: 3rem;">
            <record-day-item v-if="monthBillDetailList.length" v-for="(item, index) in monthBillDetailList" :key="index"
                :dayItem="item"></record-day-item>
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
    import { postRequest } from '@/api/api'
    export default {
        name: 'Bill',
        components: {
            TabBar,
            BillHeader,
            RecordDayItem,
            BillCharts
        },
        data() {
            return {
                echarts: null, // echarts实例
                selectExpenseIncome: 'expense',
                monthBillDetailList: [], //如果是月账单是填充此参数
                option: {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar'
                    }]
                },
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
            selectExpenseIncomeBtn(value) {
                this.selectExpenseIncome = value;
            },
            /**
             * 获取账单首页顶部内容
             */
            async billTopInfo(billType) {
                let user = this.getUser || null;
                if (user) {
                    // 用户已经登录，查询首页信息
                    let res = await postRequest({
                        url: '/bill/queryBillInfo',
                        param: {
                            userId: user.userId,
                            billType: billType || '1', //默认请求月
                            month: '202103',
                            startPage: 1,
                            pageSize: 10
                        }
                    }) || null;
                    if (res) {
                        if (res.code == '0000') {
                            let body = res.body;
                            let type = billType || '1';
                            if (type == '0') {

                            }
                            if (type == '1') {
                                this.monthBillDetailList = body.monthBillDetailList;
                            }
                            if (type == '2') {

                            }
                            console.log(res.body);
                        } else {
                            Toast(res.msg);
                        }
                    }
                }
            }
        },
        created() {
            this.billTopInfo();
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
        padding: 0 .3rem;
        padding-top: .2rem;
        width: 95%;
        border: 1px solid #bfbfbf;
        background: #fff;
    }

    .income-extends-area {
        display: flex;
        width: 100%;
        justify-content: space-between;
        font-size: .4rem;
    }

    .income-extends-area div {
        display: flex;
        align-items: center;
    }

    .income-extends-area div i {
        font-size: .4rem;
        padding-right: 2px;
    }
</style>