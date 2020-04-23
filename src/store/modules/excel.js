import { submitTicketData, submitUserData } from '@/api/excel'

const getDefaultState = () => {
  return {
    ticketData: []
  }
}

const state = getDefaultState()

const mutations = {
}

const actions = {
  // 获取配置参数
  submitTicketData({ commit }, ticketData) {
    return new Promise((resolve, reject) => {
      submitTicketData(ticketData).then(response => {
        const { data: { status }} = response
        status === 500 && reject()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  submitUserData({ commit }, userData) {
    return new Promise((resolve, reject) => {
      submitUserData(userData).then(response => {
        const { data: { status }} = response
        status === 500 && reject()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

