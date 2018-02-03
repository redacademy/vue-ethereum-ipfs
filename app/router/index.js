import Vue from 'vue'
import Router from 'vue-router'

import Hello from 'components/Hello.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      components: {
        default: Hello
      }
    }
  ]
})
