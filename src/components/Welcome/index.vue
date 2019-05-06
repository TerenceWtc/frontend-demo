<template>
  <div>
    {{$t('label.welcome')}}! {{name}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'welcome',
  computed: {
    ...mapGetters(['name'])
  }
}
</script>
