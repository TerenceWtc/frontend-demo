<template>
  <div class="inside-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="100px" label-position="right">
      <el-form-item prop="username" :label="$t('label.username')">
        <el-input class="width_260" type="text" v-model="loginForm.username" :placeholder="$t('placeholder.username')"/>
      </el-form-item>
      <el-form-item prop="password" :label="$t('label.password')">
        <el-input class="width_260" type="password" v-model="loginForm.password" @keyup.enter.native="login" :placeholder="$t('placeholder.password')"/>
      </el-form-item>
    </el-form>
    <el-button class="btn" type="primary" @click="login">{{$t('button.login')}}</el-button>
  </div>
</template>

<script>
import { password } from '@/util/validate'

export default {
  name: 'login',
  data () {
    const validatePwd = (rule, value, callback) => {
      if (password(value)) {
        callback(new Error(this.$t('regex.specialPwd')))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        username: [
          {
            required: true,
            message: this.$t('regex.username'),
            trigger: 'blur'
          },
          {
            min: 4,
            max: 20,
            message: this.$t('regex.length4to20'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('regex.password'),
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: this.$t('regex.length6to16'),
            trigger: 'blur'
          },
          {
            validator: validatePwd,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.$router.push({ path: '/' })
          })
        }
      })
    }
  }
}
</script>

<style>

</style>
