import fetch from '@/api/fetch'

const BASE_URL = '/admin/sysUser'

export function getUserInfo (token) {
  const param = {
    accessToken: token
  }
  return fetch({
    url: `${BASE_URL}/getUserInfo`,
    method: 'get',
    params: param
  })
}

export function userList (pageInfo) {
  const param = {
    pageInfo: pageInfo
  }
  return fetch({
    url: `${BASE_URL}/list`,
    method: 'get',
    params: param
  })
}

export function addObj (user) {
  return fetch({
    url: `${BASE_URL}`,
    method: 'post',
    data: user
  })
}

export function deleteObj (id) {
  return fetch({
    url: `${BASE_URL}/${id}`,
    method: 'delete'
  })
}

export function updateObj (user) {
  return fetch({
    url: `${BASE_URL}`,
    method: 'put',
    data: user
  })
}

export function getObj (id) {
  return fetch({
    url: `${BASE_URL}/${id}`,
    method: 'get'
  })
}
