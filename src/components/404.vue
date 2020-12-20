<template>
  <div>
    <header-part />
    <div class="core">
      <div>
        <img src="@/assets/404.gif" alt="" />
      </div>
      <div class="btnArea">
        <h1>this is 404 page!</h1>
        <el-button type="primary" plain size="large" @click="goPageIndex">
          返回首页
        </el-button>
      </div>
    </div>
    <my-footer />
  </div>
</template>
 
<script>
import MyFooter from '../views/PC/footer/MyFooter.vue';
import HeaderPart from '../views/PC/header/HeaderPart.vue';
export default {
  components: { HeaderPart, MyFooter },
  name: 'NotFound',
  methods: {
    goPageIndex() {
      this.$router.push('/PC/index');
    },
  },
};
</script>

<style scoped>
.core {
  width: 1200px;
  margin: 20px auto 0;
  background: #fff;
  display: flex;
  align-items: center;
}

.btnArea {
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.btnArea h1 {
  margin: 10px 0;
}
</style>