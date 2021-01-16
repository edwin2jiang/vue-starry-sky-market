<template>
  <div class="login">
    <router-link to="/MB/home">
      <van-image src="/static/logo.png" width="8rem" height="8rem" round />
    </router-link>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="rePassword"
        type="Password"
        name="密码"
        label="确认密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round>立即注册</van-button>
        &nbsp; &nbsp; &nbsp;
        <router-link to="/MB/login">
          <van-button round type="info" native-type="submit"
            >登录界面</van-button
          >
        </router-link>
      </div>
    </van-form>
  </div>
</template>
 
<script>
export default {
  name: 'Reg',
  data() {
    return {
      username: '',
      password: '',
      rePassword: '',
    };
  },
  methods: {
    onSubmit(values) {
      if (this.rePassword !== this.password) {
        this.$message({
          showClose: true,
          message: '警告，两次输入密码不一致',
          type: 'error',
        });
      } else {
        this.checkReg(values);
      }
    },
    checkReg(userInfo) {
      console.log('hello');
      let obj = {
        userInfo,
        that: this,
      };
      this.$store.commit('checkRegAndAdd', obj);
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