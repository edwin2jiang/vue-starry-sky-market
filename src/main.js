// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

// 全局引入 mock api
import mock from '@/mock/index.js'

Vue.use(ElementUI);
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: {
    App
  },
  template: '<App/>',
});

import Cookies from 'js-cookie'

window.addEventListener("beforeunload", function (e) {
  Cookies.remove('isLogin');
});
