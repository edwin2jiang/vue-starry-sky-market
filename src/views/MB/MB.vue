<template>
  <div>
    <router-view />
    <tab-bar
      v-if="getTabbarShow"
      :tabBarData="tabbarDatas"
      colorActive="#5A9FEF"
    ></tab-bar>
  </div>
</template>
 
<script>
const TabBar = () => import('components/tabbar/TabBar');
import tabbarDatas from '@/tabbar.config';

export default {
  name: 'MB',
  components: {
    TabBar,
  },
  data() {
    return {
      tabbarDatas,
    };
  },
  computed: {
    getTabbarShow() {
      if (this.$route.meta.TabbarShow === undefined) return true;
      else return this.$route.meta.TabbarShow;
    },
  },
};
</script>

<style>
#like996_identification {
  display: none;
}

html {
  font-size: 10px;
}
@media only screen and (min-width: 413px) {
  html {
    font-size: 12px !important;
  }
}
@media only screen and (min-width: 481px) {
  html {
    font-size: 15px !important;
  }
}
@media only screen and (min-width: 641px) {
  html {
    font-size: 20px !important;
  }
}
</style>