import Vue from 'vue';
import Vuex from 'vuex';

// 1.引入外部依赖
import mutations from '@/store/mutations'
import getters from '@/store/getters'
import actions from '@/store/actions'
import moduleA from '@/store/modules/moduleA'

// 2.安装vuex
Vue.use(Vuex);

// 3. 创建state
const state = {
  count: 20,
  isLogin: false,
  userInfo: null,
  users:null
}

// 4. 导入模块
const modules = {
  a: moduleA
}

// 5. 创建vuex对象
const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules
})

// 6. 导出
export default store;
