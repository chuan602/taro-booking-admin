import request from '@/utils/request'
// import qs from 'qs'

export function submitTicketData(ticketData) {
  return request({
    url: '/manager/excel/ticket',
    method: 'post',
    data: ticketData
  })
}

export function submitUserData(userData) {
  return request({
    url: '/manager/excel/user',
    method: 'post',
    data: userData
  })
}
