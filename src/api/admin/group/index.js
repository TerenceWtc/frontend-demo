import fetch from '@/api/fetch'

const BASE_URL = '/admin/group'

export function groupIdAndName () {
  return fetch({
    url: `${BASE_URL}/idAndName`,
    method: 'get'
  })
}
