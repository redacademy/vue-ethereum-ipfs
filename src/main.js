import Vue from 'vue'
import Web3 from 'web3'
import VueForm from 'vue-form'
import App from './App'
import router from './router'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { setDefaultWeb3Account } from './web3Service'

Vue.config.productionTip = false
// PWA using webpack-offline-plugin.
// This will produce a warning in development mode, you can ignore.
OfflinePluginRuntime.install()

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

Vue.use(VueForm)
;(async () => {
  try {
    // Set global default account for convenience
    web3.defaultAccount = await setDefaultWeb3Account()
  } catch (e) {
    // TODO: Handle error
  }
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
})()
