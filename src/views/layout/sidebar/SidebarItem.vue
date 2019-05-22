<template>
  <div>
    <el-menu-item v-if="!hasChild(item)" :index="'/' + item.code">
      <svg-icon :name="item.icon" :iconClass="`svg-icon svg-white`"/>
      <span slot="title">{{$t('label.' + item.title)}}</span>
    </el-menu-item>
    <el-submenu v-if="hasChild(item)" :index="'/' + item.code">
      <span slot="title">{{$t('label.' + item.title)}}</span>
      <sidebar-item v-for="child in item.children" :key="child.code" :item="child"/>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'sidebar-item',
  props: ['item'],
  methods: {
    hasChild (item) {
      if (item.children.length === 0) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>

</style>
