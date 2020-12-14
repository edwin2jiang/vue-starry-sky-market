<template>
  <div>
    手机端
    <keep-alive>
      <router-view/> 
    </keep-alive>
    <tab-bar :tabBarData="tabbarDatas" colorActive="#5A9FEF"></tab-bar>
  </div>
</template>
 
<script>
const TabBar = () => import("components/tabbar/TabBar");
import tabbarDatas from "@/tabbar.config";

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
};
</script>

<style scoped>
</style>