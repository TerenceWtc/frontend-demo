<template>
  <div class="layout-container">
    <el-container>
      <el-container>
        <el-aside class="asidebar" :class="{hideSidebar: !sidebar.opened}">
          <sidebar class="sidebar-container"/>
        </el-aside>
        <el-main>
          <navbar class="navbar-container"/>
          <contents class="contents-container"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Navbar from '@/views/layout/navbar/index'
import Sidebar from '@/views/layout/sidebar/index'
import Contents from '@/views/layout/contents/index'

export default {
  name: 'layout',
  components: {
    'navbar': Navbar,
    'sidebar': Sidebar,
    'contents': Contents
  },
  computed: {
    sidebar () {
      return this.$store.getters.sidebar
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/layout/index.scss';
</style>
