<!--
 * @Descritption: 柱状图
 * @Author: yuzhimin
 * @Date: 2021-02-22 10:45:56
 * @LastEditors: yuzhimin
 * @LastEditTime: 2021-02-23 10:01:36
-->
<template>
  <div ref="echarts" class="echarts-dom"></div>
</template>

<script>
  import * as Echarts from 'echarts'
  // 时间正则
  const regx = /(\d{4})(\d{2})(\d{2})/
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
        interval: 14
      },
      splitLine: {
        show: true,
        interval: 0
      },
      data: ['', '', '']
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
          color: '#000',
          width: 2,
          type: 'solid'
        }
      },
      position(pos, sers) {
        console.log(pos);
        console.log(sers);
        //如果是在末尾时需要向左边移动多一点
        // eg: 3-24 / 3-5
        let name = sers[0].name;
        let day = parseInt(name.split('-')[1])*3 + 10;
        let x = pos[0] - day;
        return [x, -15]
      },
      formatter(sers) {
        const ser = (sers && sers[0]) || {}
        const times = ser.name && ser.name.split('-')
        const money = (ser.value || 0).toFixed(2)
        return `${times[0]}月${times[1]}日 ￥${money}`
      },
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      extraCssText: 'box-shadow: 0 0 0 rgba(0, 0, 0, 0.3);'
    },
    series: [{
      data: [],
      type: 'bar',
      itemStyle: {
        borderRadius: [5, 5, 0, 0]
      },
      barCategoryGap: '60%'
    }]
  }
  export default {
    name: 'bar',
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
        //设置横轴的数据 
        options.xAxis.data = this.list.map(l => (l.time && `${Number(l.time.replace(regx, '$2'))}-${Number(l.time.replace(regx, '$3'))}`) || '')
        //设置纵轴的数据
        options.series[0].data = this.list.map(l => l.money)
        //设置横轴的间隔宽度
        options.series[0].barMinWidth = `${(1 / this.list.length) * 100}%`;
        //设置颜色
        options.series[0].itemStyle.color = this.selectExpenseIncome == 'expense' ? '#ed7773' : '#4eab7f';
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