import fetch from '@/api/fetch'

export function getCheckboxData () {
  return fetch({
    url: '/checkbox/getData',
    method: 'get'
  })
}
