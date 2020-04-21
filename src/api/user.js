import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/manager/login',
    method: 'post',
    params: data,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
