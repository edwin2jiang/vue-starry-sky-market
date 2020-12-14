<template>
  <div class="inline-block" id="fatherBox">
    <el-carousel indicator-position="none" id="box" :interval="8000">
      <el-carousel-item v-for="(item, index) in lists" :key="index">
        <el-image
          style="width: 190px; height: 150px"
          :src="item.url1"
          fit="cover"
        ></el-image>
        <el-image
          style="width: 190px; height: 150px; margin-top: 6px"
          :src="item.url2"
          fit="cover"
        ></el-image>
        <el-image
          style="width: 190px; height: 150px; margin-top: 6px"
          :src="item.url3"
          fit="cover"
        ></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
 
<script>
export default {
  name: 'ErectRotation',
  data() {
    return {
      lists: [
        {
          url1: '/static/erectRotation/erectRotation1.webp',
          url2: '/static/erectRotation/erectRotation2.webp',
          url3: '/static/erectRotation/erectRotation3.webp',
        },
        {
          url1: '/static/erectRotation/erectRotation4.webp',
          url2: '/static/erectRotation/erectRotation5.webp',
          url3: '/static/erectRotation/erectRotation6.webp',
        },
        {
          url1: '/static/erectRotation/erectRotation7.webp',
          url2: '/static/erectRotation/erectRotation8.webp',
          url3: '/static/erectRotation/erectRotation9.webp',
        },
      ],
    };
  },
};
</script>

<style scoped>
#fatherBox{
  margin: 0 3px;
}
#box {
  /* background: #f33; */
  width: 190px;
  height: 470px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}
</style>