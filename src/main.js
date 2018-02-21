import Vue from 'vue'
import VueForm from 'vue-form'
import App from './App'
import router from './router'
import store from './store'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { setDefaultWeb3Account, getNetIdString } from './web3Service'
Vue.config.productionTip = false
Vue.use(VueForm)
;(async () => {
  try {
    const defaultEthWallet = await setDefaultWeb3Account()
    const blockchainId = await getNetIdString()
    store.commit('setNetworkId', blockchainId)
    store.commit('setDefaultEthWallet', defaultEthWallet)
  } catch (e) {
    // TODO: Handle error
    console.log(e)
  } finally {
    new Vue({
      el: '#app',
      store,
      router,
      components: { App },
      template: '<App/>'
    })
  }
})()

// PWA using webpack-offline-plugin.
// This will produce a warning in development mode, you can ignore.
OfflinePluginRuntime.install()
