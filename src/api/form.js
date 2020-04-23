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
    data: config
  })
}
