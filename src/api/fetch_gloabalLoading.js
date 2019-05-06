import axios from 'axios'
import { Loading } from 'element-ui'

// create an axios' instance
const instance = axios.create({
  // use process.env.BASE_API
  baseURL: process.env.BASE_API,
  timeout: 30 * 1000
})

let needLoadingCount = 0
let loading

function startLoading () {
  loading = Loading.service({
    lock: true,
    fullscreen: true,
    text: 'loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}

function endLoading () {
  loading.close()
}

function showFullScreenLoading () {
  if (needLoadingCount === 0) {
    startLoading()
  }
  needLoadingCount++
}

function hideFullScrennLoading () {
  if (needLoadingCount <= 0) {
    return
  }
  needLoadingCount--
  if (needLoadingCount === 0) {
    endLoading()
  }
}

instance.interceptors.request.use(config => {
  showFullScreenLoading()
  return config
}, error => {
  Promise.reject(error)
})

instance.interceptors.response.use(resposne => {
  hideFullScrennLoading()
  return resposne
}, error => {
  Promise.reject(error)
})

export default instance
