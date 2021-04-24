<!--
 * @Descritption: 扇形图
 * @Author: rollin
 * @Date: 2021-03-30 17:57:57
-->
<template>
    <div ref="echarts" class="echarts-dom"></div>
</template>
<script>
    import * as Echarts from 'echarts'
    let expenseColor = ["#F9891E", "#E74E00", "#FFEC07 ", "#FFC30D"]
    let incomeColor = ["#4DBC20", "#179800", "#E0EF15 ", "#9AD52C"]

    // echarts配置
    let options = {
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: '报表信息',
                type: 'pie',
                radius: ['30%', '45%'],
                avoidLabelOverlap: false,
                emphasis: {
                    label: {
                        show: false,
                        fontSize: '40',
                        fontWeight: 'bold',
                    }
                },
                label: {
                    show: true,
                    color: 'rgba(0, 0, 0, 0.6)',
                    position: "outside",
                    formatter: '{b} {d}%\n\n',
                    padding: [0, -70]
                },
                labelLine: {
                    lineStyle: {
                        color: '#F48B13'
                    },
                    smooth: 0.2,
                    length: 15,
                    length2: 80
                }
            }
        ]
    }

    export default {
        name: 'ReportCharts',
        props: {
            list: {
                type: Array,
                default: () => ([])
            },
            selectExpenseIncome: {
                type: String,
                default: () => ("expense")
            }
        },
        watch: {
            list: {
                handler() {
                    // 设置echarts
                    this.setOptions()
                },
                deep: true
            }
        },
        data() {
            return {
                echarts: null // echarts实例
            }
        },
        mounted() {
            // 实例化echarts
            this.echarts = this.$refs.echarts && Echarts.init(this.$refs.echarts)
            // 设置echarts
            this.setOptions()
            // 监听浏览器窗口变化
            this.echarts && (window.onresize = this.echarts.resize)
        },
        methods: {
            /**
             * 设置echarts
             */
            setOptions() {
                //设置数据 - 根据是否有数据进行重新渲染
                if(this.list.length) {
                    options.series[0].data = this.list.map(item => ({ name: item.classifyName, value: (parseFloat(item.proportion) * 100).toFixed(0) }));
                } else {
                    options.series[0].data = [{name: '暂无数据', value: 100}]
                }
                //设置颜色 - 根据用户选择的支出还是收入进行改变图表颜色
                if(this.selectExpenseIncome == 'expense') {
                    options.series[0].color = expenseColor;
                    options.series[0].labelLine.lineStyle.color = '#F48B13';
                } else {
                    options.series[0].color = incomeColor;
                    options.series[0].labelLine.lineStyle.color = '#4eab7f';
                }
                this.echarts && this.echarts.setOption(options)
            }
        },
        beforeDestroy() {
            this.echarts && (window.onresize = null)
        }
    }
</script>

<style scoped="scoped">
    .bar {
        width: 100%;
        height: 100%;
    }
</style>