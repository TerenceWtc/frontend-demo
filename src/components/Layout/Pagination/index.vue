<template>
  <div v-show="!loading" class="pagination-container">
    <el-pagination
    @current-change="pageChange"
    @size-change="sizeChange"
    :current-page.sync="thisPage"
    :page-sizes="[1,10,20,30,50]"
    :page-size="thisSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['total', 'page', 'size', 'loading'],
  data () {
    return {
      thisPage: undefined,
      thisSize: undefined
    }
  },
  methods: {
    pageChange (val) {
      this.thisPage = val
      this.$nextTick(() => this.$parent.getList())
    },
    sizeChange (val) {
      this.thisSize = val
      this.$nextTick(() => this.$parent.getList())
    }
  },
  watch: {
    page: function (val) {
      this.thisPage = val
    },
    thisPage: function (val) {
      this.$emit('update:page', val)
    },
    size: function (val) {
      this.thisSize = val
    },
    thisSize: function (val) {
      this.$emit('update:size', val)
    }
  }

}
</script>

<style>

</style>
