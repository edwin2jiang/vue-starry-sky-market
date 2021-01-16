// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Cookies from 'js-cookie'
import VueCookies from 'vue-cookies'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

// 全局引入 mock api，这一行是有作用的，请勿删除
import mock from '@/mock/index.js'

Vue.use(VueCookies)
Vue.use(ElementUI)
Vue.prototype.$axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
  components: {
    App,
  },
  template: '<App/>',
})

window.addEventListener('beforeunload', function (e) {
  Cookies.remove('isLogin')
})
