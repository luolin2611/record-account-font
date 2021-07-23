<!--
 * @Descritption: 年账单折线图
 * @Author: yuzhimin
 * @Date: 2021-03-15 15:24:25
 * @LastEditors: yuzhimin
 * @LastEditTime: 2021-03-16 09:31:49
-->
<template>
  <div ref="echarts" class="echarts-dom lines"></div>
</template>

<script>
  import * as Echarts from 'echarts'
  // echarts配置
  let options = {
    grid: {
      top: '10%',
      left: '5%',
      bottom: '12%',
      right: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisTick: {
        show: false
      },
      axisLabel: {
        show: true,
        fontSize: 10
      },
      splitLine: {
        show: true,
        interval: 0,
        lineStyle: {
          opacity: 0.6
        }
      },
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        axis: 'x',
        lineStyle: {
          color: 'rgba(0, 0, 0, 0.25)',
          width: 2,
          type: 'solid'
        }
      },
      position(pos, sers) {
        const ser = sers[0]
        const day = ser.name.replace('月')
        const leng = `${sers[0].value.toFixed(2)}`.length + `${sers[1].value.toFixed(2)}`.length
        const phase = day - 16
        let base = 8
        let baseLeng = 3.5
        if (phase < 0) {
          base = 0
          baseLeng = 0
        }
        const x = 15 + phase * base + leng * baseLeng
        return [pos[0] - x, -15]
      },
      formatter(sers) {
        const incomeMoney = (sers[0].value || 0).toFixed(2)
        const expenseMoney = (sers[1].value || 0).toFixed(2)
        return `${sers[0].name} 收入：￥${incomeMoney} 支出：￥${expenseMoney}`
      },
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);'
    },
    series: [{
      data: [],
      type: 'line',
      name: '收入',
      stack: '收入',
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        normal: {
          color: 'rgb(96, 197, 148)'
        }
      },
      lineStyle: {
        normal: {
          color: 'rgb(96, 197, 148)',
          width: 0.8
        }
      }
    }, {
      data: [],
      type: 'line',
      name: '支出',
      stack: '支出',
      symbol: 'circle',
      symbolSize: 6,
      itemStyle: {
        normal: {
          color: 'rgb(233, 121, 118)'
        }
      },
      lineStyle: {
        normal: {
          color: 'rgb(233, 121, 118)',
          width: 0.8
        }
      }
    }]
  }
  export default {
    name: 'lines',
    props: {
      list: {
        type: Object,
        default: () => ({})
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
        options.series[0] && (options.series[0].data = this.list.incomeList || [])
        options.series[1] && (options.series[1].data = this.list.expenseList || [])
        this.echarts && this.echarts.setOption(options)
      }
    },
    beforeDestroy() {
      this.echarts && (window.onresize = null)
    }
  }
</script>

<style scoped="scoped">
  .lines {
    width: 100%;
    height: 100%;
  }
</style>