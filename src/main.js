// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import axios from '@/axios'
import vuetify from '@/plugins/vuetify'
// import vuetify from 'vuetify'
// import 'vuetify/dist/vuetify.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

// let vuetify = new Vuetify()
Vue.config.productionTip = false

Vue.use(vuetify)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  vuetify,
  components: { App },
  template: '<App/>',
  created () {
    console.log('!!!')
  }
})
