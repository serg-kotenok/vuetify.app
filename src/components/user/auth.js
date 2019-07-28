import JwtDecode from 'jwt-decode'
import axios from 'axios'

export const AUTH_REQUEST = 'AUTH_REQUEST'
export const AUTH_LOGOUT = 'AUTH_LOGOUT'

export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_ERROR = 'AUTH_ERROR'

export const USER_REQUEST = 'USER_REQUEST'

export const AUTH_STATUS_NO_USER = ''
export const AUTH_STATUS_USER = 'user'
export const AUTH_STATUS_LOADING = 'loading'
export const AUTH_STATUS_ERROR = 'error'

const authInfo = {
  url: 'http://vuetify.dapp/src/@/ajax/auth.php',
  method: 'POST'
}

export const actions = {
  [ AUTH_REQUEST ]: ({ commit, dispatch }, user) => {
    return new Promise((resolve, reject) => { // The Promise used for router redirect in login
      commit(AUTH_REQUEST)
      axios({
        url: authInfo.url,
        data: user,
        method: authInfo.method
      }).then(resp => {
        const token = resp.data.token
        localStorage.setItem('user-token', token) // store the token in localstorage
        commit(AUTH_SUCCESS)
        // you have your token, now log in your user :)
        //        dispatch(USER_REQUEST)
        resolve(resp)
      }).catch(err => {
        commit(AUTH_ERROR, err)
        localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
        reject(err)
      })
    })
  },
  [ AUTH_LOGOUT ]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token') // clear your user's token from localstorage
      resolve()
    })
  }
}

// basic mutations, showing loading, success, error to reflect the api call status and the token when loaded
export const mutations = {
  [ AUTH_REQUEST ]: (state) => {
    state.status = 'loading'
  },
  [ AUTH_SUCCESS ]: (state, token) => {
    state.status = 'success'
    state.token = token
  },
  [ AUTH_ERROR ]: (state) => {
    state.status = 'error'
  },
  [ AUTH_LOGOUT ]: (state) => {
    state.status = 'logout'
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
