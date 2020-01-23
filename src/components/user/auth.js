import JwtDecode from 'jwt-decode'
import axios from 'axios'

export const REG_REQUEST = 'REG_REQUEST'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const LOGOUT = 'LOGOUT'

export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_ERROR = 'AUTH_ERROR'

export const STATUS_NO_USER = 'anon'
export const STATUS_USER = 'auth'
export const STATUS_LOADING = 'loading'
export const STATUS_ERROR = 'error'

const API = {
  url: 'https://127.0.0.1:8000/',
  method: 'POST'
}

export const actions = {
  [ REG_REQUEST ]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => {
      let request = {
        url: API.url + 'user/reg',
        data: user,
        method: API.method
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
        url: API.url + 'user/auth',
        data: user,
        method: API.method
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
export const зmutations = {
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

export class User {
  constructor ({ login, settings }) {
    this.login = login
    this.settings = settings
  }

  static from (token) {
    try {
      let obj = JwtDecode(token)
      if (obj != null) {
        return new User(obj)
      }
    } catch (_) {
    }
    return null
  }
}
