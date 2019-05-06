<template>
  <svg :class="iconClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svgIcon',
  props: {
    name: {
      type: String,
      required: true
    },
    iconClass: {
      type: String,
      required: false
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/components/SvgIcon/index.scss';
</style>
