<template>
  <div class="top-container">
    <div>
      <el-button @click="addHandler">add</el-button>
      <el-button @click="detailHandler">detail</el-button>
      <el-button @click="updateHandler">update</el-button>
      <el-button @click="deleteHandler">delete</el-button>
    </div>
    <div>
      <el-input placeholder="请输入内容" v-model="search">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="用户名" value="username"></el-option>
          <el-option label="姓名" value="name"></el-option>
        </el-select>
        <el-button slot="append" @click="searchHandler" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: undefined,
      select: 'username'
    }
  },
  methods: {
    addHandler () {
      this.$parent.addHandler()
    },
    detailHandler () {
      this.$parent.detailHandler()
    },
    updateHandler () {
      this.$parent.updateHandler()
    },
    deleteHandler () {
      this.$parent.deleteHandler()
    },
    searchHandler () {
      let searchParam = [
        {
          'direction': this.select,
          'property': this.search
        }
      ]
      this.$parent.searchHandler(searchParam)
    }
  }
}
</script>

<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
