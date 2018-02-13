import Vue from 'vue'
import Router from 'vue-router'

import Hello from 'components/Hello.vue'
import ContractCreate from 'components/ContractCreate.vue'
import ContractView from 'components/ContractView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      components: {
        default: Hello
      }
    },
    {
      path: '/contract',
      components: {
        default: ContractCreate
      }
    },
    {
      path: '/contracts',
      components: {
        default: ContractView
      }
    }
  ]
})
