import JwtDecode from 'jwt-decode'
import axios from 'axios'
import User from '@/models/user'
// eslint-disable-next-line camelcase
import * as mutation_types from '@/store/mutation_types'

const state = {
  user: User.from(localStorage.getItem('user-token')),
  isLoading: false,
  errorMsg: ''
}

const getters = {
  getUser: (state) => state.user,
  isAuthenticated: (state) => !!state.user,
  isLoading: (state) => state.loading,
  isError: (state) => !!state.errorMsg
}

export const mutations = {
  [ mutation_types.USER_LOADING ]: (state, isLoading) => {
    state.errorMsg = ''
    state.isLoading = isLoading
  },
  [ mutation_types.USER_SUCCESS ]: (state, token) => {
    localStorage.setItem('user-token', token)
    axios.defaults.headers.common['Authorization'] = 'Barear' + ' ' + token
    this.USER_LOADING(state, false)
    state.user = User.from(token)
  },
  [ mutation_types.USER_ERROR ]: (state, errorMsg) => {
    localStorage.removeItem('user-token')
    delete axios.defaults.headers.common['Authorization']
    this.USER_LOADING(state, false)
    state.errorMsg = errorMsg
  },
  [ mutation_types.USER_LOGOUT ]: (state) => {
    localStorage.removeItem('user-token')
    state.user = null
    delete axios.defaults.headers.common['Authorization']
  }
}

export const actions = {
  register: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit(mutation_types.USER_LOADING, true)
      axios({
        url: axios.defaults.baseURL + '/user/reg',
        data: user,
        method: 'POST'
      }).then((response) => {
        const data = response.data
        if (data.status === 'ok' && data.token !== '') {
          if (JwtDecode(data.token)) {
            commit(mutation_types.USER_SUCCESS, data.token)
            resolve(response)
          }
        }
      }).catch((error) => {
        commit(mutation_types.USER_ERROR, error)
        reject(error)
      })
    })
  },
  login: ({commit}, user) => {
    return new Promise((resolve, reject) => {
      commit(mutation_types.USER_LOADING, true)
      axios({
        url: axios.defaults.baseURL + '/user/auth',
        data: user,
        method: 'POST'
      }).then((response) => {
        const data = response.data
        if (data.status === 'ok' && data.token !== '') {
          if (JwtDecode(data.token)) {
            commit(mutation_types.USER_SUCCESS, data.token)
            resolve(response)
          }
        }
      }).catch((error) => {
        commit(mutation_types.USER_ERROR, error)
        reject(error)
      })
    })
  },
  logout: ({commit}) => {
    return new Promise((resolve, reject) => {
      commit(mutation_types.USER_LOGOUT)
      resolve()
    })
  }
/*
    [ AUTH_REQUEST ]: ({ commit, dispatch }, user) => {
      return new Promise((resolve, reject) => { // The Promise used for router redirect in login
        const request = {
          url: USER_API.url + 'auth',
          data: user,
          method: USER_API.method
        }

        commit(AUTH_REQUEST)
        axios(request).then(response => {
          const data = response.data
          if (data.status === 'ok' && data.token !== '') {
            if (JwtDecode(data.token)) {
              commit(USER_SUCCESS, data.token)
              resolve(response)
            }
          }
          // commit(USER_ERROR, data.status)
          // reject(response)
        }).catch(err => {
          commit(USER_ERROR, 'API server malfunction')
          reject(err)
        })
      })
    },
    [ LOGOUT ]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(LOGOUT)
      resolve()
    })
  }
  */
}

export default {
  state,
  getters,
  mutations,
  actions
}

/*
export const actions = {
  [ REG_REQUEST ]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      let request = {
        url: USER_API.url + 'reg',
        data: user,
        method: USER_API.method
      }

      commit(REG_REQUEST)
      axios(request).then(response => {
        const data = response.data
        if (data.status === 'ok' && data.token !== '') {
          if (JwtDecode(data.token)) {
            commit(USER_SUCCESS, data.token)
            resolve(response)
          }
        }
        commit(USER_ERROR)
        reject(response)
      }).catch(err => {
        commit(USER_ERROR)
        reject(err)
      })
    })
  },
  [ AUTH_REQUEST ]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      const request = {
        url: USER_API.url + 'auth',
        data: user,
        method: USER_API.method
      }

      commit(AUTH_REQUEST)
      axios(request).then(response => {
        const data = response.data
        if (data.status === 'ok' && data.token !== '') {
          if (JwtDecode(data.token)) {
            commit(USER_SUCCESS, data.token)
            resolve(response)
          }
        }
        // commit(USER_ERROR, data.status)
        // reject(response)
      }).catch(err => {
        commit(USER_ERROR, 'API server malfunction')
        reject(err)
      })
    })
  },
  [ LOGOUT ]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(LOGOUT)
      resolve()
    })
  }
}

// basic mutations, showing loading, success, error to reflect the api call status and the token when loaded
export const mutations = {
  [ REG_REQUEST ]: (state) => {
    state.status = STATUS_LOADING
    delete state.reason
  },
  [ AUTH_REQUEST ]: (state) => {
    state.status = STATUS_LOADING
    delete state.reason
  },
  [ USER_SUCCESS ]: (state, token) => {
    localStorage.setItem('user-token', token)
    //    axios.defaults.headers.common['Authorization'] = 'Barear ' + token
    state.user = User.from(token)
    state.status = STATUS_USER
    delete state.reason
  },
  [ USER_ERROR ]: (state, errorMsg) => {
    localStorage.removeItem('user-token')
    // delete axios.defaults.headers.common['Authorization']
    state.status = STATUS_ERROR
    state.reason = errorMsg
  },
  [ LOGOUT ]: (state) => {
    localStorage.removeItem('user-token')
    delete axios.defaults.headers.common['Authorization']
    state.user = null
    state.status = STATUS_NO_USER
  }
}
*/
