import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function getNetIdString(id) {
  switch (id) {
    case '1':
      return 'Main Ethereum Network'
    case '2':
      return 'Morden Test Network (Depricated)'
    case '3':
      return 'Ropsten Test Network'
    case 'loading':
      return undefined
    // Will be some random number when connected locally
    default:
      return 'Local Test Net'
  }
}

const store = new Vuex.Store({
  state: {
    netIdString: getNetIdString(web3.version.network)
  },
  getters: {},
  mutations: {},
  actions: {}
})

export default store
