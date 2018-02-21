import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    netIdString: '',
    defaultEthWallet: ''
  },
  getters: {},
  mutations: {
    setNetworkId(state, netIdString) {
      state.netIdString = netIdString
    },
    setDefaultEthWallet(state, walletAddress) {
      state.defaultEthWallet = walletAddress
    }
  },
  actions: {}
})

export default store
