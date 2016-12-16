import Vue from 'vue'
import Router from 'vue-router'

import Lists from 'components/Lists.vue'
import Detail from 'components/Detail.vue'
import Book from 'components/Book.vue'
import User from 'components/User.vue'

import Hero from 'components/Hero.vue'
import Navigation from 'components/Navigation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/top',
      components: {
        default: Lists,
        nav: Hero
      }
    },
    {
      path: '/detail/:id(\\d+)?',
      components: {
        default: Detail,
        nav: Navigation
      }
    },
    {
      path: '/book/:id(\\d+)?',
      components: {
        default: Book,
        nav: Navigation
      }
    },
    {
      path: '/user/:id(\\d+)?',
      components: {
        default: User,
        nav: Navigation
      }
    },
    { path: '/', redirect: '/top' }
  ]
})
