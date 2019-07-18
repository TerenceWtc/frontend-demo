import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store/index'
import { getAccessToken } from '@/util/auth'
import { verify } from '@/util/jwt'
import i18n from '@/lang'
import { refresh } from '@/api/auth/refresh'

const s = 1000

// create an axios' instance
const instance = axios.create({
  // use process.env.BASE_API
  // baseURL: process.env.BASE_API,
  baseURL: '/api',
  timeout: 30 * s
})

// request interceptor
instance.interceptors.request.use(async config => {
  // set accessToken in request headers if exist
  if (store.getters.accessToken) {
    // verify whether token expired
    if (verify(getAccessToken())) {
      // refresh accessToken by refreshToken
      await refresh().then(
        newToken => {
          config.headers['X-access-token'] = 'Bearer ' + newToken
        }
      )
    } else {
      config.headers['X-access-token'] = 'Bearer ' + getAccessToken()
    }
  }
  return config
}, error => {
  Promise.reject(error)
})

// response interceptor
instance.interceptors.response.use(
  response => {
    let data = response.data
    let status = response.status
    if (status !== 200) {
      Message({
        message: i18n.t(`code.${status}`),
        type: 'warning',
        duration: 5 * s
      })
      return Promise.reject(new Error(data.message))
    }
    return data
  },
  error => {
    if (error.response.data.status === 60202) {
      MessageBox.confirm('You are logout', {
        confirmButtonText: 'Re-login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(
        () => {
          store.dispatch('FrontendLogOut').then(() => {
            location.reload()
          })
        }
      )
    }
    Promise.reject(error)
  }
)

export default instance
