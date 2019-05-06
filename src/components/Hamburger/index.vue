<template>
  <div @click="toggleClick">
    <el-tooltip effect="dark" :content="$t('hint.' + (sidebar.opened ? 'fold' : 'expand'))" placement="bottom-start">
      <svg-icon :name="`hamburger`" :iconClass="`svg-icon svg-black icon hamburger`" :class="{'is-active': sidebar.opened}"/>
    </el-tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '@/icons/svg/hamburger.svg'
export default {
  name: 'hamburger',
  methods: {
    toggleClick () {
      this.$store.dispatch('toggleSidebar')
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  }
}
</script>

<style lang="scss">
@import '../../style/components/Hamburger/index.scss';
</style>
