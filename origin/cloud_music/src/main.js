import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from '@/api'
import VueLazyload from 'vue-lazyload'

import '@/plugin/vant.js'
import './assets/stylus/resetvant.styl' // 重置Vant样式
import * as filters from './filters/index'

// 阿里图标
import '@/assets/iconfont/iconfont.css'

// 数据懒加载
// 尴尬的事发生了，Vant集成了一个懒加载机制，插件作用就不大了
Vue.use(VueLazyload, {
  // loading: './assets/image/load-img.png',
  attempt: 2
})
Vue.prototype.$api = api

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
