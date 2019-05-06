import fetch from '@/api/fetch'

const BASE_URL = '/auth'

export function login (user) {
  return fetch({
    url: `${BASE_URL}/login`,
    method: 'post',
    data: user
  })
}

export function verifyUsername (username) {
  const param = {
    username: username
  }
  return fetch({
    url: `${BASE_URL}/verifyUsername`,
    method: 'get',
    params: param
  })
}

export function register (user) {
  return fetch({
    url: `${BASE_URL}/register`,
    method: 'post',
    data: user
  })
}
