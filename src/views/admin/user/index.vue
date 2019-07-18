<template>
  <div>
    <div>
      <my-header/>
    </div>

    <div>
      <el-table :data="tableData"
      v-loading="loading"
      @selection-change="selectionChangeHandler">
        <el-table-column type="selection" width="45"/>
        <el-table-column type='index' label='序号'/>
        <el-table-column prop='username' label='用户名'/>
        <el-table-column prop='name' label='姓名'/>
        <el-table-column prop='groupName' label='角色'/>
      </el-table>
    </div>

    <div>
      <my-page ref="page" :total.sync="pageVo.total"
      :page.sync="pageVo.page"
      :size.sync="pageVo.size"
      :loading.sync="loading"/>
    </div>

    <div>
      <entity-user ref="user"/>
    </div>
  </div>
</template>

<script>
import { userList, deleteObj, getObj } from '@/api/admin/user'
import User from './user'
import Pagination from '@/components/Layout/Pagination'
import Header from '@/components/Layout/Header'

export default {
  name: 'list',
  components: {
    'entity-user': User,
    'my-page': Pagination,
    'my-header': Header
  },
  data () {
    return {
      tableData: undefined,
      dialogVisible: false,
      dialogType: undefined,
      loading: false,
      pageVo: {
        page: 1,
        size: 10,
        total: 0,
        paramsVoList: []
      },
      multipleSelection: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      let that = this
      this.loading = true
      let pageInfo = JSON.stringify(this.pageVo)
      pageInfo = encodeURIComponent(pageInfo)
      userList(pageInfo).then(response => {
        that.tableData = response.data.rows
        that.pageVo.total = response.data.total
        that.loading = false
      })
    },
    addHandler () {
      this.$refs['user'].showAdd()
    },
    deleteHandler () {
      this.multipleSelection.forEach(element => {
        deleteObj(element.userId).then(() => {
          this.getList()
        })
      })
    },
    updateHandler () {
      getObj(this.multipleSelection[0].userId).then(response => {
        this.$refs['user'].showUpdate(response.data)
      })
    },
    detailHandler () {
      getObj(this.multipleSelection[0].userId).then(response => {
        this.$refs['user'].showDetail(response.data)
      })
    },
    searchHandler (search) {
      this.pageVo.paramsVoList = search
      this.getList()
    },
    selectionChangeHandler (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss">
@import '../../../style/admin/user/index.scss';
</style>
