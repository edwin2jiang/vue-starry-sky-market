<template>
  <div>
    <header-part />
    <search />
    <div class="content card">
      <category></category>
      <rotation />
      <erect-rotation />
      <serve />
      <sec-kill />
      <recommend />
    </div>
    <my-footer />
  </div>
</template>
 
<script>
import HeaderPart from '@/views/PC/header/HeaderPart';
import Search from '@/views/PC/search/Search';
import Category from '@/views/PC/category/Category';
import Rotation from '@/views/PC/rotation/Rotation';
import ErectRotation from '@/views/PC/erectRotation/ErectRotation.vue';
import Serve from '@/views/PC/serve/Serve';
import SecKill from '@/views/PC/secKill/SecKill.vue';
import Recommend from '@/views/PC/recommend/Recommend.vue';
import MyFooter from '@/views/PC/footer/MyFooter.vue';

export default {
  name: 'Index',
  components: {
    HeaderPart,
    Search,
    Category,
    Rotation,
    ErectRotation,
    Serve,
    SecKill,
    Recommend,
    MyFooter,
  },
  beforeCreate() {
    // 加载默认值
    this.$store.commit('loadDefaultUsers');
  },
};
</script>

<style scoped>
.content {
  width: 1200px;
  margin: 10px auto;
}
</style>