<template>
  <div class="inside-container">
    <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="100px" label-position="right">
      <el-form-item prop="username" :label="$t('label.username')">
        <el-input class="width_260" type="text" v-model="registerForm.username" :placeholder="$t('placeholder.username')"/>
      </el-form-item>
      <el-form-item prop="password" :label="$t('label.password')">
        <el-input class="width_260" type="password" v-model="registerForm.password" :placeholder="$t('placeholder.password')"/>
      </el-form-item>
      <el-form-item prop="confirmPass" :label="$t('label.confirmPass')">
        <el-input class="width_260" type="password" v-model="registerForm.confirmPass" :placeholder="$t('placeholder.confirmPass')"/>
      </el-form-item>
      <el-form-item prop="name" :label="$t('label.name')">
        <el-input class="width_260" type="text" v-model="registerForm.name" :placeholder="$t('placeholder.name')"/>
      </el-form-item>
      <el-form-item prop="email" :label="$t('label.email')">
        <el-input class="width_260" type="text" v-model="registerForm.email" :placeholder="$t('placeholder.email')"/>
      </el-form-item>
    </el-form>
    <el-button class="btn" type="primary" @click="register">{{$t('button.register')}}</el-button>
  </div>
</template>

<script>
import { password, email } from '@/util/validate'
import { verifyUsername } from '@/api/auth/login'

export default {
  name: 'register',
  data () {
    const validateUsername = async (rule, value, callback) => {
      let result = false
      await verifyUsername(this.registerForm.username).then(response => {
        result = response.data
      })
      if (result) {
        callback(new Error(this.$t('regex.duplicateUsername')))
      } else {
        callback()
      }
    }
    const validatePwd = (rule, value, callback) => {
      if (password(value)) {
        callback(new Error(this.$t('regex.specialPwd')))
      } else {
        callback()
      }
    }
    const validateConfirm = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error(this.$t('regex.confirmPwd')))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (email(value)) {
        callback(new Error(this.$t('regex.invalidEmail')))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        username: undefined,
        password: undefined,
        confirmPass: undefined,
        name: undefined,
        email: undefined
      },
      registerRules: {
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
          },
          {
            validator: validateUsername,
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
        ],
        confirmPass: [
          {
            required: true,
            message: this.$t('regex.password'),
            trigger: 'blur'
          },
          {
            validator: validateConfirm,
            trigger: 'blur'
          }
        ],
        name: {
          required: true,
          message: this.$t('regex.name'),
          trigger: 'blur'
        },
        email: [
          {
            required: true,
            message: this.$t('regex.email'),
            trigger: 'blur'
          },
          {
            validator: validateEmail,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    register () {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          this.$store.dispatch('Register', this.registerForm).then(() => {
            this.$router.push({ path: '/' })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>

</style>
