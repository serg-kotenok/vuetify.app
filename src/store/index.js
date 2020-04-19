import Vue from 'vue'
import Vuex from 'vuex'
import * as user from '@/store/modules/user'

class UserStore {
  state,
  getter
//  actions: user.actions,
//  mutations: user.mutations
}

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: UserStore
  }
})

export default store
