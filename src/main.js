import Vue from 'vue'
import App from './App'
import Home from './components/Home.vue'
import TimeEntries from './components/TimeEntries'
import LogTime from './components/LogTime'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
/* eslint-disable no-new */

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/home': {
    component: Home
  },
  '/time-entries': {
    component: TimeEntries,
    subRoutes: {
      '/log-time': {
        component: LogTime
      }
    }
  }
})

router.redirect({
  '*': '/home'
})

router.start(App, '#app')
