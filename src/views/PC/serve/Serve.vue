<template>
  <div id="serve" class="inline-block" style="vertical-align: top">
    <div class="header">
      <div style="display: flex; align-items: center; margin-top: 2px">
        <el-avatar
          size="large"
          :src="userInfo !== null ? userInfo['headImg'] : logo"
          style="margin: 0 6px"
        >
        </el-avatar>
        <span style="color: #888">Hi~欢迎逛商城!</span>
      </div>
      <div>
        <!-- <template v-if="userInfo === null"> -->
        <template v-if="userInfo === null">
          <el-link @click="toPage('/PC/login?isLogin=true')"> 登录 </el-link>
          <span class="div"> | </span>
          <el-link @click="toPage('/PC/login?isLogin=false')">注册</el-link>
        </template>
        <template v-else>
          <el-link :underline="false">{{ sayHello }}(*^▽^*)</el-link>
        </template>
      </div>
      <div style="margin: 4px 0 0">
        <el-button type="danger" round size="small">新人福利</el-button>
        <el-button type="warning" round size="small">PLUS会员</el-button>
      </div>
    </div>
    <div class="hr"></div>
    <div class="news">
      <div class="top">
        <span class="title">商城快报</span>
        <el-link class="link"> 更多> </el-link>
      </div>
      <div class="lists">
        <div class="item" v-for="(item, index) in 4" :key="index">
          <el-tag type="danger" size="mini">推荐</el-tag>
          <el-link>2019年度TWS真无...</el-link>
        </div>
      </div>
    </div>
    <div class="hr"></div>
    <div class="nav">
      <div class="item" v-for="(item, index) in nav" :key="index">
        <div class="item-element">
          <img
            :src="item.url"
            alt=""
            width="28px"
            height="28px"
            class="pointer"
          />
          <span>{{ item.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import nav from './nav.config';
import logo from './logo.config';
export default {
  name: 'Serve',
  data() {
    return {
      nav,
      logo,
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    sayHello() {
      let d = new Date();
      console.log(d.getHours());
      let hour = d.getHours();
      if (hour <= 12) {
        return '上午好';
      } else if (hour < 18) {
        return '下午好';
      } else {
        return '晚上好';
      }
    },
  },
  methods: {
    toPage(item) {
      this.$router.push(item);
    },
  },
};
</script>

<style scoped>
#serve {
  width: 209px;
  height: 470px;
  background: #fff;
}

#serve .header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#serve .news {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#serve .news .top .title {
  font-weight: 600;
  position: relative;
  left: -26px;
}

#serve .news .top .link {
  position: relative;
  left: 28px;
}

#serve .nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

#serve .nav .item-element {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 56px;
  margin-bottom: 2px;
}
</style>