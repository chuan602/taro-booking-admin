import request from '@/utils/request'

export function getConfigurations() {
  return request({
    url: '/manager/config'
  })
}

export function setConfigurations(config) {
  return request({
    url: '/manager/config',
    method: 'post',
    params: config,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}
