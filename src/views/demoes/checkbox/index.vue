<template>
<div>
  <div>
    <h3>{{$t('label.checkbox')}}</h3>
    <div v-for="(groups, groupId) in checkData" :key="groupId">
      <el-checkbox v-model="groups.checkAll" @change="handleAll(groupId)">{{groups.groupName}}</el-checkbox>
      <div v-for="(members, memberId) in groups.checkGroup" :key="memberId" class="indent_2">
        <el-checkbox v-model="members.checkMember" @change="handleOne(groupId, memberId)">{{members.name}}</el-checkbox>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { getCheckboxData } from '@/api/checkbox'

export default {
  name: 'checkbox',
  data () {
    return {
      checkData: undefined
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      getCheckboxData().then(response => {
        this.checkData = response.data
      })
    },
    handleAll (groupId) {
      let allFlag = true
      for (let i = 0; i < this.checkData[groupId].checkGroup.length; i++) {
        allFlag = this.checkData[groupId].checkGroup[i].checkMember === false ? false : allFlag
      }
      if (allFlag) {
        for (let i = 0; i < this.checkData[groupId].checkGroup.length; i++) {
          this.checkData[groupId].checkGroup[i].checkMember = false
        }
      } else {
        for (let i = 0; i < this.checkData[groupId].checkGroup.length; i++) {
          this.checkData[groupId].checkGroup[i].checkMember = true
        }
      }
    },
    handleOne (groupId, memberId) {
      let allFlag = true
      for (let i = 0; i < this.checkData[groupId].checkGroup.length; i++) {
        allFlag = this.checkData[groupId].checkGroup[i].checkMember === false ? false : allFlag
      }
      if (allFlag) {
        for (let i = 0; i < this.checkData[groupId].checkGroup.length; i++) {
          this.checkData[groupId].checkAll = true
        }
      } else {
        for (let i = 0; i < this.checkData[groupId].checkGroup.length; i++) {
          this.checkData[groupId].checkAll = false
        }
      }
    }
  }
}
</script>
