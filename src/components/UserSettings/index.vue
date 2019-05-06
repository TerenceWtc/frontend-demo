<template>
  <el-dropdown trigger="click">
    <div>
      <el-tooltip effect="dark" :content="$t('hint.setting')" placement="bottom-start">
        <svg-icon :name="`settings`" :iconClass="`svg-icon svg-black icon`"/>
      </el-tooltip>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>{{$t('label.userinfo')}}</el-dropdown-item>
      <el-dropdown-item>{{$t('label.resetPassword')}}</el-dropdown-item>
      <el-dropdown-item divided><div @click="logout">{{$t('label.logout')}}</div></el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import '@/icons/svg/settings.svg'
export default {
  name: 'user-settings',
  data () {
    return {

    }
  },
  methods: {
    logout () {
      this.$store.dispatch('FrontendLogOut').then(() => {
        location.reload()
      })
    }
  }
}
</script>
