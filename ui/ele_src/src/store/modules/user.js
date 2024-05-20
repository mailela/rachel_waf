import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import { waf_init, waf_info } from '@/api/system'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    role_name: '',
    config: {},
    menus: {}
  }
}

const state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.config = info
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_VERSION: (state, name) => {
    state.version = name
  },
  SET_N_VERSION: (state, name) => {
    state.n_version = name
  },
  SET_WATERMARK: (state, name) => {
    state.watermark = name
  },
  SET_ROLE_NAME: (state, name) => {
    state.role_name = name
  },
  SET_MENU: (state, name) => {
    state.menus = name
  },
  SET_ENCODE: (state, encode) => {
    state.encode = encode
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  init({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      waf_init({ username: username.trim(), password: password }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  system_info({ commit }) {
    return new Promise((resolve, reject) => {
      waf_info().then(response => {
        commit('SET_INFO', response.data)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    let that = this;
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar, encode, menus, role_name, watermark } = data
        // console.log(data)
        commit('SET_NAME', name)
        commit('SET_WATERMARK', watermark)
        commit('SET_ROLE_NAME', role_name)
        commit('SET_MENU', menus)
        commit('SET_AVATAR', avatar)
        commit('SET_ENCODE', encode)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

