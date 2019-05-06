<template>
  <div>
    <e-line :lineId="line" :lineStyle="lineStyle" ref="bg_level"/>
  </div>
</template>

<script>
import EChartsLine from '@/components/ECharts/Line'

export default {
  name: 'eline',
  components: {
    'e-line': EChartsLine
  },
  data () {
    return {
      line: 'lineChart',
      lineStyle: 'line_style'
    }
  }
}
</script>
