import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/user/Register'
import Login from '@/components/user/Login'
import Event from '@/components/event/Event'
import PageNotFound from '@/components/PageNotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register },
    { path: '/add', name: 'add event', component: Event },
    { path: '*', component: PageNotFound }
  ]
})
