import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/user/Register'
import Login from '@/components/user/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/register', name: 'register', component: Register }
  ]
})
