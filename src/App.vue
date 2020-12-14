<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  },
};
</script>

<style>
@import url('./assets/css/base.css');

#app {
  background-color: #f0f3f8;
}
</style>