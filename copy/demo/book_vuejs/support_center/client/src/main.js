import "babel-polyfill"
import Vue from 'vue'
import VueRouter from 'vue-router'

import AppLayout from './components/AppLayout.vue'
import router from './router'
import './global-components'
import fetch from './plugins/fetch'

Vue.use(VueRouter)
Vue.use(fetch, {
  baseUrl: "http://localhost:3000/",
})

new Vue({
  el: '#app',
  render: h => h(AppLayout),
  router
})
