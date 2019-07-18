import fetch from '@/api/fetch'

const BASE_URL = '/admin/sysMenu'

export function getMenuList (token) {
  const param = {
    accessToken: token
  }
  return fetch({
    url: `${BASE_URL}/getMenuList`,
    method: 'get',
    params: param
  })
}
