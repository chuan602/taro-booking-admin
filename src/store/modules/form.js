import { getConfigurations, setConfigurations } from '@/api/form'
import { setToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    deadline: 0,
    delay: 0,
    punish: 0,
    full: 0,
    advance: 0
  }
}

const state = getDefaultState()

const mutations = {
  SET_CONFIGURATIONS: (state, payload) => {
    const { deadline, delay, punish, full, advance } = payload
    Object.assign(state, {
      deadline,
      delay,
      punish,
      full,
      advance
    })
  },
  SET_FORMITEM: (state, type, value) => {
    state[type] = value
  }
}

const actions = {
  // 获取配置参数
  getConfigurations({ commit }) {
    return new Promise((resolve, reject) => {
      getConfigurations().then(response => {
        const { data } = response
        const { data: result } = data
        const { config } = result
        commit('SET_CONFIGURATIONS', config)
        resolve({
          deadline: +config.deadline[0],
          delay: +config.delay[0],
          punish: +config.punish[0],
          full: +config.full[0],
          advance: +config.advance[0]
        })
      }).catch(error => {
        reject(error)
      })
    })
  },
  setConfiguration({ commit }, config) {
    return new Promise((resolve, reject) => {
      setConfigurations(config)
        .then(res => {
          commit('SET_CONFIGURATIONS', config)
          resolve(config)
        })
        .catch(err => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

