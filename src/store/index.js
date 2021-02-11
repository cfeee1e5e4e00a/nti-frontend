import Vue from 'vue'
import Vuex from 'vuex'

import account from './modules/account.js'
import developers from './modules/developers.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account, developers
  }
})