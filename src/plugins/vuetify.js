import Vue from 'vue'
import Vuetify from 'vuetify'
// import Ripples from 'vuetify/lib/directives'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify, {
//  directives: Ripples
})

export default new Vuetify({
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  }
})
