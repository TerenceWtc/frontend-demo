<template>
  <div class="login-container">
    <el-tabs v-model="active" :stretch="stretch">
      <el-tab-pane :label="$t('label.login')" name="login">
        <login/>
      </el-tab-pane>
      <el-tab-pane :label="$t('label.registration')" name="register">
        <register/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Login from './login/index'
import Register from './register/index'

export default {
  name: 'login-register',
  components: {
    'login': Login,
    'register': Register
  },
  data () {
    return {
      active: 'login',
      stretch: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/login/index.scss';
</style>
