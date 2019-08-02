/*
import {
  AUTH_REQUEST,
  AUTH_LOGOUT,
  AUTH_SUCCESS,
  AUTH_ERROR,
  User, actions
} from '@/components/user/auth'
*/
import * as auth from '@/components/user/auth'

const state = {
  user: auth.User.from(localStorage.getItem('user-token')),
  token: '',
  status: 'logout'
}

const getters = {
  getUser: (state) => {
    return state.user
  },
  isAuthenticated: (state) => {
    return (state.status !== 'logout') && (state.status !== 'error')
    //    return !!state.token
  },
  authStatus: (state) => {
    return state.status
  },
  authLoading: state => state.status === 'loading',
  authError: state => state.status === auth.STATUS_ERROR
}

export default {
  state,
  getters,
  actions: auth.actions,
  mutations: auth.mutations
}
