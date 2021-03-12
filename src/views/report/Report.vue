<template>
    <div class="report-tab">
        <report-header :title="'报表'"></report-header>

        <!-- 1.图表区域 -->
        <div style="display: flex;justify-content: center;width: 100%;">
            <div class="charts-area">
                <div class="expense-income-area">
                    <div class="expense-income-item">
                        <div>
                            <i class="iconfont icon-selected-radio"></i>
                            <p>月支出</p>
                        </div>
                        <p class="text" style="color:#ec6564;font-weight: 600;">￥1,44011.00</p>
                    </div>
                    <div class="expense-income-item">
                        <div>
                            <i class="iconfont icon-unselected-radio"></i>
                            <p>月支出</p>
                        </div>
                        <p class="text" style="color: #4eab7f;font-weight: 600;">￥14,4999.02</p>
                    </div>
                </div>
                <!-- 显示插图 -->
                <div style="height: 6rem; width: 8rem;" ref="echarts"></div>
            </div>
        </div>

        <!-- 2.内容区域 -->
        <div class="content-area">
            <statistics-item></statistics-item>
            <statistics-item></statistics-item>
            <statistics-item></statistics-item>
            <statistics-item></statistics-item>
            <statistics-item></statistics-item>
            <statistics-item></statistics-item>
            <statistics-item></statistics-item>
            <statistics-item></statistics-item>
            <statistics-item></statistics-item>
            <statistics-item></statistics-item>
        </div>

        <tab-bar :selectIndex="2"></tab-bar>
    </div>
</template>
<script>
    import TabBar from '@/components/TabBar.vue'
    import ReportHeader from '@/components/Header.vue'
    import * as echarts from 'echarts'
    import StatisticsItem from './component/StatisticsItem.vue'
    export default {
        name: 'Report',
        components: {
            TabBar,
            ReportHeader,
            StatisticsItem,
        },
        data() {
            return {
                echarts: null, // echarts实例
                option: {
                    tooltip: {
                        trigger: 'item'
                    },
                    // legend: {
                    //     top: '5%',
                    //     left: 'center'
                    // },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['30%', '45%'],
                            avoidLabelOverlap: false,
                            emphasis: {
                                label: {
                                    show: false,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            label: {
                                color: 'rgba(0, 0, 0, 0.6)'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: 'rgba(0, 0, 0, 0.6)'
                                },
                                smooth: 0.2,
                                length: 8,
                                length2: 10
                            },
                            data: [
                                { value: 31, name: '餐饮 31%' },
                                { value: 21, name: '淘宝 21%' },
                                { value: 20, name: '住房 20%' },
                                { value: 10, name: '购物 10%' },
                                { value: 4, name: '服装 4%' },
                                { value: 3, name: '人情 3%' },
                                { value: 3, name: '交通 3%' }
                            ]
                        }
                    ]
                }
            }
        },
        mounted() {
            this.echarts = echarts.init(this.$refs.echarts)
            this.echarts.setOption(this.option)
        }
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

    .expense-income-area {
        display: flex;
        width: 100%;
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