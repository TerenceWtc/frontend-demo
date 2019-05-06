import axios from 'axios'
import { getRefreshToken } from '@/util/auth'
import { MessageBox } from 'element-ui'
import store from '@/store/index'

export async function refresh () {
  return axios({
    method: 'POST',
    url: '/api/auth/refresh',
    headers: {
      'X-refresh-token': getRefreshToken()
    }
  }).then(response => {
    let data = response.data
    let status = data.status
    // logout if refreshToken expired
    if (status === 60202) {
      MessageBox.confirm('You are logout', {
        confirmButtonText: 'Re-login',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        store.dispatch('FrontendLogOut').then(() => {
          location.reload()
        })
      })
      return Promise.reject(new Error(data.message))
    }
    store.dispatch('RefreshToken', response.data.data)
    return response.data.data
  })
}
