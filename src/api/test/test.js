import fetch from '@/api/fetch'

export function test () {
  return fetch({
    url: '/changeZone',
    method: 'get'
  })
}
