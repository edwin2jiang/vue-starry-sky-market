<template>
  <div>
    <header>
      <div class="top">
        <van-image
          width="6rem"
          height="6rem"
          round
          src="/static/images/headImg/0.jpg"
          alt="头像"
        />
        <span v-if="getUserInfo === null" class="txt" @click="toPage('login')">
          登录/注册
        </span>
        <div v-else class="nameSpace">
          <span class="txt">
            {{ this.getUserInfo.username || this.getUserInfo.name }}
          </span>
          <span class="exit" @click="logout">退出登录</span>
        </div>
      </div>
      <div class="nav box">
        <div class="inline-block item">
          <span class="num">0</span>
          <span class="txt"> 收藏夹 </span>
        </div>
        <div class="inline-block item">
          <span class="num">0</span>
          <span class="txt"> 关注店铺 </span>
        </div>
        <div class="inline-block item">
          <span class="num">0</span>
          <span class="txt"> 足迹 </span>
        </div>
        <div class="inline-block item">
          <span class="num">0</span>
          <span class="txt"> 红包卡券 </span>
        </div>
      </div>
    </header>
    <content>
      <Card :hasTitle="true" title="我的订单" rightText="查看所有订单">
        <template #content>
          <div class="box">
            <div class="item" v-for="(item, index) in orderArr" :key="index">
              <van-image
                width="2.9rem"
                height="2.9rem"
                :src="`/static/images/order/order-${index}.webp`"
              />
              <span class="txt"> {{ item }} </span>
            </div>
          </div>
        </template>
      </Card>

      <Card :hasTitle="true" title="必备工具" rightText="查看所有工具">
        <template #content>
          <div class="box">
            <div
              class="tool item"
              v-for="(item, index) in toolsArr"
              :key="index"
            >
              <van-image
                width="2.9rem"
                height="2.9rem"
                :src="`/static/images/tools/tool-${index}.webp`"
              />
              <span class="txt"> {{ item }} </span>
            </div>
          </div>
        </template>
      </Card>
    </content>
  </div>
</template>
 
<script>
import Cookies from 'js-cookie';
import Card from '@/views/MB/components/Card';
export default {
  name: 'Profile',
  components: { Card },
  data() {
    return {
      orderArr: ['待付款', '待发货', '待收货', '评价', '退款/售后'],
      toolsArr: [
        '每日返现',
        '待发货',
        '待收货',
        '评价',
        '退款/售后',
        '待收货',
        '评价',
        '退款/售后',
      ],
    };
  },
  methods: {
    toPage(item) {
      this.$router.push('/MB/login');
    },
    logout() {
      this.$store.commit('logOut');
    },
  },
  computed: {
    getUserInfo() {
      return this.$store.state.userInfo;
    },
  },
};
</script>

<style scoped>
header {
  background: #fff;
  padding: 1rem;
}

header .top {
  display: flex;
  align-items: center;
}

header .top .txt {
  font-size: 1.4rem;
  padding-left: 2rem;
  font-weight: 600;
}

header .box {
  padding: 1rem 0;
  display: flex;
  justify-content: space-around;
  font-size: 1.4rem;
}

header .box .item {
  display: flex;
  flex-direction: column;
  text-align: center;
}

content {
  margin-top: 10rem;
}

content .top {
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

content .box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

content .box .item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tool {
  width: 7rem;
  padding: 0.4rem;
}

.nameSpace .exit {
  display: inline-block;
  margin-left: 5rem;
}
</style>