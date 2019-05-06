import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import ElementEnLocale from 'element-ui/lib/locale/lang/en'
import ElementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import EnLocale from './en'
import ZhLocale from './zh'
import locale from 'element-ui/lib/locale'

Vue.use(VueI18n)

const messages = {
  en: {
    ...EnLocale,
    ...ElementEnLocale
  },
  zh: {
    ...ZhLocale,
    ...ElementZhLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en',
  messages
})

locale.i18n((key, value) => i18n.t(key, value))

export default i18n
