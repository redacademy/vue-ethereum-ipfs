import Vue from 'vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import VueForm from 'vue-form'
import App from './App'

sync(store, router)

Vue.use(VueForm)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

