import fetch from '@/api/fetch'

export function getLine () {
  return fetch({
    url: '/echarts/line',
    method: 'get'
  })
}
