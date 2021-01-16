<template>
  <div class="tabbar">
    <TabBarItem
      v-for="(item, index) in tabBarData"
      :key="index"
      :item="item"
      :colorActive="colorActive"
    ></TabBarItem>
  </div>
</template>
 
<script>
const TabBarItem = () => import('./TabBarItem');
export default {
  name: 'TabBar',
  components: {
    TabBarItem,
  },
  props: ['tabBarData', 'colorActive'],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.tabbar {
  display: flex;
  justify-content: space-around;
  position: fixed;
  background: #fff;
  left: 0;
  bottom: 0;
  right: 0;
  height: 49px;
  padding: 2px 0;
  box-shadow: 0 -2px 2px #ccc;
  z-index: 999;
}
</style>