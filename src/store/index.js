import Vue from 'vue';
import Vuex from 'vuex';

import mutations from '@/store/mutations';
import getters from '@/store/getters';
import actions from '@/store/actions';
import moduleA from '@/store/modules/moduleA';

Vue.use(Vuex);

const state = {
  count: 20,
  isLogin: false,
  userInfo: null,
  users: null,
  goodsList: null,
};

const modules = {
  a: moduleA,
};

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules,
});

export default store;
