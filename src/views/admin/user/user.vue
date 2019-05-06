<template>
  <div>
    <el-dialog :title="type"
    :visible.sync="visible"
    :close-on-click-modal="false">
      <el-form :model="userForm" :rules="type === 'Create' ? userRules : userRulesWithoutPwd" ref="userForm" :validate-on-rule-change="false">
        <el-form-item prop="username" :label="$t('label.username')">
          <el-input class="width_260" type="text" v-model="userForm.username" :disabled="type != 'Create'" :placeholder="$t('placeholder.username')"/>
        </el-form-item>
        <el-form-item prop="password" v-show="type == 'Create'" :label="$t('label.password')">
          <el-input class="width_260" type="password" v-model="userForm.password" :placeholder="$t('placeholder.password')"/>
        </el-form-item>
        <el-form-item prop="confirmPass" v-show="type == 'Create'" :label="$t('label.confirmPass')">
          <el-input class="width_260" type="password" v-model="userForm.confirmPass" :placeholder="$t('placeholder.confirmPass')"/>
        </el-form-item>
        <el-form-item prop="name" :label="$t('label.name')">
          <el-input class="width_260" type="text" v-model="userForm.name" :disabled="type == 'Detail'" :placeholder="$t('placeholder.name')"/>
        </el-form-item>
        <el-form-item prop="email" :label="$t('label.email')">
          <el-input class="width_260" type="text" v-model="userForm.email" :disabled="type == 'Detail'" :placeholder="$t('placeholder.email')"/>
        </el-form-item>
        <el-form-item prop="gender" :label="$t('label.gender')">
          <el-input class="width_260" type="text" v-model="userForm.gender" :disabled="type == 'Detail'" :placeholder="$t('placeholder.gender')"/>
        </el-form-item>
        <el-form-item prop="mobile" :label="$t('label.mobile')">
          <el-input class="width_260" type="text" v-model="userForm.mobile" :disabled="type == 'Detail'" :placeholder="$t('placeholder.mobile')"/>
        </el-form-item>
        <!-- <el-form-item prop="group" :label="$t('label.group')">
          <el-input class="width_260" type="text" v-model="userForm.group" :disabled="type == 'Detail'" :placeholder="$t('placeholder.group')"/>
        </el-form-item> -->
        <el-form-item prop="group" :label="$t('label.group')">
          <el-select v-model="selectedGroup" placeholder="请选择">
            <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.name"/>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button v-show="type == 'Create'" @click="addHandler" type="primary">create</el-button>
        <el-button v-show="type == 'Update'" @click="updateHandler" type="primary">update</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addObj, updateObj } from '@/api/admin/user'
import { password, email } from '@/util/validate'
import { verifyUsername } from '@/api/auth/login'
import { groupIdAndName } from '@/api/admin/group'

export default {
  name: 'user-template',
  data () {
    const validateUsername = async (rule, value, callback) => {
      let result = false
      await verifyUsername(this.userForm.username).then(response => {
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
      if (value !== this.userForm.password) {
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
      visible: false,
      type: undefined,
      userForm: {
        username: '',
        password: '',
        confirmPass: '',
        name: '',
        email: '',
        gender: '',
        mobile: '',
        group: ''
      },
      groupList: [],
      selectedGroup: undefined,
      userRules: {
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
      },
      userRulesWithoutPwd: {
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
  created () {
    this.getGroupList()
  },
  methods: {
    getGroupList () {
      groupIdAndName().then(response => {
        this.groupList = response.data
      })
    },
    showAdd () {
      this.visible = true
      this.type = global.create
      // update DOM
      this.$nextTick(() => this.reset())
    },
    addHandler () {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          addObj(this.userForm).then(() => {
            this.visible = false
            this.$parent.getList()
          })
        } else {
          return false
        }
      })
    },
    showUpdate (userObj) {
      this.visible = true
      this.type = global.update
      this.$nextTick(() => {
        this.reset()
        this.userForm = userObj
      })
    },
    updateHandler () {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          updateObj(this.userForm).then(() => {
            this.visible = false
            this.$parent.getList()
          })
        } else {
          return false
        }
      })
    },
    showDetail (userObj) {
      this.visible = true
      this.type = global.detail
      this.$nextTick(() => {
        this.reset()
        this.userForm = userObj
      })
    },
    reset () {
      this.$refs['userForm'].resetFields()
    }
  }
  // computed: {
  //   ruleList: function () {
  //     if (this.type === global.create) {
  //       console.log(this.type)
  //       return this.userRules
  //     } else {
  //       console.log(this.type)
  //       return this.userRulesWithoutPwd
  //     }
  //   }
  // }
}
</script>

<style>

</style>
