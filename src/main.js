import Vue from 'vue'
import VueForm from 'vue-form'
import App from './App'
import router from './router'
import store from './store'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'

import { getNetIdString, getEthWallets } from './web3Service'
import OrbitDB from './OrbitDBPlugin'

Vue.config.productionTip = false
Vue.use(VueForm)
Vue.use(OrbitDB)
;(async () => {
  try {
    const ethWallets = await getEthWallets()
    const netIdString = await getNetIdString()
    store.commit('setNetworkId', netIdString)
    store.commit('setDefaultEthWallet', ethWallets[0])
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

OfflinePluginRuntime.install()
