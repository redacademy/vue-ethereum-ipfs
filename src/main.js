import Vue from 'vue'
import VueForm from 'vue-form'
import App from './App'
import router from './router'
import store from './store'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { getDefaultEthWallet, getNetIdString } from './web3Service'
Vue.config.productionTip = false
Vue.use(VueForm)
;(async () => {
  try {
    const defaultEthWallet = await getDefaultEthWallet()
    const netIdString = await getNetIdString()
    store.commit('setNetworkId', netIdString)
    store.commit('setDefaultEthWallet', defaultEthWallet)
  } catch (e) {
    // TODO: Handle error
    // eslint-disable-next-line
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

// PWA build using webpack-offline-plugin.
// This will produce a warning in development, you can ignore.
OfflinePluginRuntime.install()
