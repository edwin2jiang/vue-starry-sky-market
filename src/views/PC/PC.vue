<template>
  <div id="app">
    <el-backtop></el-backtop>
    <router-view />
  </div>
</template>
 
<script>
export default {
  name: 'PC',
};
</script>

<style scoped>
.content {
  width: 1200px;
  height: 470px;
  margin: 10px auto;
  background: #fff;
}
</style>