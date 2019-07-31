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
    return new Promise(( resolve, reject ) => {
      commit(REG_REQUEST)
      axios({
        url: API.url + 'user/reg',
        data: user,
        method: API.method
      }).then(responae => {
        const token = response
        console.log(response)
        console.log(JwtDecode(token.data))
        localStorage.setItem('user-token', token) // store the token in localstorage
        commit(USER_SUCCESS)
        // you have your token, now log in your user :)
        //        dispatch(USER_REQUEST)
        resolve(response)
      }).catch(err => {
        commit(USER_ERROR, err)
        localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
        reject(err)
      })
    })
  },
  [ AUTH_REQUEST ]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit(AUTH_REQUEST)
      axios({
        url: API.url + 'user/auth',
        data: user,
        method: API.method
      }).then(response => {
        const token = response
        console.log(response)
        console.log(JwtDecode(token.data))
        localStorage.setItem('user-token', token) // store the token in localstorage
        commit(USER_SUCCESS)
        // you have your token, now log in your user :)
        //        dispatch(USER_REQUEST)
        resolve(response)
      }).catch(err => {
        commit(USER_ERROR, err)
        localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
        reject(err)
      })
    })
  },
  [ LOGOUT ]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(LOGOUT)
      localStorage.removeItem('user-token') // clear your user's token from localstorage
      resolve()
    })
  }
}

// basic mutations, showing loading, success, error to reflect the api call status and the token when loaded
export const mutations = {
  [ REG_REQUEST ]: (state) => {
    state.status = STATUS_LOADING
  },
  [ AUTH_REQUEST ]: (state) => {
    state.status = STATUS_LOADING
  },
  [ USER_SUCCESS ]: (state, token) => {
    state.status = STATUS_USER
    localStorage.setItem('user-token', token)
  },
  [ USER_ERROR ]: (state) => {
    state.status = STATUS_ERROR
  },
  [ LOGOUT ]: (state) => {
    state.status = STATUS_NO_USER
  }
}

export class User {
  constructor ({ userId, admin, email }) {
    this.id = userId // eslint-disable-line camelcase
    this.admin = admin
    this.email = email
  }

  static from (token) {
    try {
      let obj = JwtDecode(token)
      return new User(obj)
    } catch (_) {
      return null
    }
  }

  isAdmin () {
    return this.admin
  }
}
