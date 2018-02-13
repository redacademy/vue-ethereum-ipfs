import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function getNetId (id) {
  switch (id) {
    case '1':
      return 'Main Ethereum Network'
    case '2':
      return 'Morden Test Network (Depricated)'
    case '3':
      return 'Ropsten Test Network'
    case 'loading':
      return undefined
    default:
      return 'Local Test Net'
  }
}

const store = new Vuex.Store({
  state: {
    netId: getNetId(web3.version.network)
  },
  getters: {},
  mutations: {},
  actions: {}
})

export default store
