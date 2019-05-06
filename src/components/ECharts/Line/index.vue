<template>
  <div :id="lineId" :class="lineStyle"/>
</template>

<script>
// import echarts from 'echarts'
import { getLine } from '@/api/eCharts/line'

export default {
  name: 'eCharts-line',
  props: ['lineId', 'lineStyle'],
  data () {
    return {
      lineData: undefined
    }
  },
  mounted () {
    this.getLineData()
  },
  methods: {
    getLineData () {
      getLine().then(response => {
        this.lineData = response.data
      }).then(() => {
        this.drawLine()
      })
    },
    drawLine () {
      // let eCharts = echarts.init(document.getElementById(this.lineId))
      // eCharts.setOption(this.lineData)
    }
  }
}
</script>

<style>
.line_style {
  height: 500px;
  width: 1000px;
}
</style>
