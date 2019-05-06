<template>
  <div>
    <el-menu-item v-for="item in menus" :index="'/' + item.code" :key="item.code">
      <svg-icon :name="item.icon" :iconClass="`svg-icon svg-white`"/>
      <span slot="title">{{$t('label.' + item.title)}}</span>
    </el-menu-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'sidebar-item',
  computed: {
    ...mapGetters([
      'menus'
    ])
  }
}
</script>

<style>

</style>
