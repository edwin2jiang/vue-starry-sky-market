<template>
  <div class="login">
    <router-link to="/MB/home">
      <van-image src="/static/logo.png" width="8rem" height="8rem" round />
    </router-link>

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round type="info" native-type="submit">登录</van-button>
        &nbsp; &nbsp; &nbsp;
        <router-link to="/MB/reg">
          <van-button round>注册</van-button>
        </router-link>
        &nbsp; &nbsp; &nbsp;
        <router-link to="/MB/home">
          <van-button round>首页</van-button>
        </router-link>
      </div>
    </van-form>
  </div>
</template>
 
<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) {
      this.checkLogin(values);
      console.log('submit', values);
    },
    checkLogin(userInfo) {
      // 判断用户账号密码是否正确
      // 返回值 true or false

      let obj = {
        userInfo,
        that: this,
      };

      this.$store.commit('getUsersAndCheck', obj);
    },
  },
};
</script>

<style scoped>
.login {
  margin: 4rem 1rem;
  text-align: center;
  background: #fff;
  border-radius: 20px;
  padding: 20px;
  /* width: 90%; */
}
</style>