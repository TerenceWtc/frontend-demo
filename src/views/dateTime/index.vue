<template>
  <div>
    <el-form>
      <el-date-picker
        v-model="dateTime"
        type="datetime"
        :placeholder="$t('placeholder.datetime')">
      </el-date-picker>
      <time-zone></time-zone>
    </el-form>
  </div>
</template>

<script>
import TimeZone from '@/components/TimeZone/index'
export default {
  name: 'dateTime',
  components: {
    TimeZone
  },
  data () {
    return {
      dateTime: ''
    }
  },
  created () {

  },
  methods: {

  }
}
</script>
