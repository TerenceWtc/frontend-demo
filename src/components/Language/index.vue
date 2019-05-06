<template>
  <div @click="languageHandle">
    <el-tooltip effect="dark" :content="$t('hint.language')" placement="bottom-start">
      <svg-icon :name="`language`" :iconClass="`svg-icon svg-black icon`"/>
    </el-tooltip>
  </div>
</template>

<script>
import '@/icons/svg/language.svg'
export default {
  name: 'language',
  methods: {
    languageHandle () {
      let language = this.$store.getters.language === 'en' ? 'zh' : 'en'
      this.$i18n.locale = language
      this.$store.dispatch('setLanguage', language)
      this.$message({
        message: this.$t('message.switchLanguage'),
        type: 'success'
      })
    }
  }
}
</script>
