import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/user/Register'
import Login from '@/components/user/Login'
import Settings from '@/components/user/Settings'
import Logout from '@/components/user/Logout'
import Event from '@/components/event/Event'
import PageNotFound from '@/components/PageNotFound'
import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login, beforeEnter: ifNotAuthenticated },
    { path: '/register', name: 'register', component: Register, beforeEnter: ifNotAuthenticated },
    { path: '/logout', name: 'logout', component: Logout, beforeEnter: ifAuthenticated },
    { path: '/settings', name: 'settings', component: Settings, beforeEnter: ifAuthenticated },
    { path: '/add', name: 'add event', component: Event },
    { path: '*', component: PageNotFound }
  ]
})
