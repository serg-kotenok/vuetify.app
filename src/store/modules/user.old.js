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

const user = auth.User.from(localStorage.getItem('user-token'))

const state = {
  user: user,
  status: user ? auth.STATUS_USER : auth.STATUS_NO_USER
}

const getters = {
  getUser: (state) => {
    return state.user
  },
  isAuthenticated: (state) => {
    return (state.user !== null)
    //    return !!state.token
  },
  authStatus: (state) => {
    return state.status
  },
  authLoading: state => state.status === auth.STATUS_LOADING,
  authError: state => state.status === auth.STATUS_ERROR
}

export default {
  state,
  getters,
  actions: auth.actions,
  mutations: auth.mutations
}
