<template>
  <el-carousel
    :interval="5000"
    arrow="always"
    style="display: inline-block; width: 590px;height: 470px;"
  >
    <el-carousel-item v-for="item in imgs" :key="item">
      <el-image
        style="width: 590px; height: 470px"
        :src="item"
        fit="cover"
      ></el-image>
    </el-carousel-item>
  </el-carousel>
</template>
 
<script>
export default {
  name: 'Rotation',
  data() {
    return {
      imgs: [
        '/static/lunbo/lunbo1.webp',
        '/static/lunbo/lunbo2.webp',
        '/static/lunbo/lunbo3.webp',
      ],
    };
  },
};
</script>

<style scoped>
</style>