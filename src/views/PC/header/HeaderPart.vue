<template>
  <header id="header">
    <div id="content">
      <span>
        <div class="inline-block pointer" @click="toPage('/PC/index')">
          <i class="el-icon-s-home" style="color: #79bbff"></i>
          <span style="font-size: 14px">江苏</span>
        </div>
      </span>
      <span class="rightLink">
        <template v-if="this.$store.state.userInfo === null">
          <el-link @click="toPage('/PC/login?isLogin=true')" :underline="false"
            >您好，请先登录
          </el-link>
          <el-link
            @click="toPage('/PC/login?isLogin=false')"
            type="primary"
            :underline="false"
          >
            免费注册
          </el-link>
        </template>
        <template v-else style="font-size: 12px">
          <el-link :underline="false">
            <span> 尊敬的用户: </span>
            <span>{{
              this.$store.state.userInfo.name ||
              this.$store.state.userInfo.username
            }}</span>
          </el-link>
          <el-link @click="logout" type="primary" :underline="false">
            退出登录
          </el-link>
        </template>
        <span class="div"> | </span>
        <el-link :underline="false" @click="toPage('/PC/cart')">
          购物车
        </el-link>
        <span class="div"> | </span>
        <el-link :underline="false" @click="toIndex()">商城首页</el-link>
        <span class="div"> | </span>
        <el-link :underline="false" @click.native="helloUser()"
          >开心果</el-link
        >
        <span class="div"> | </span>
        <el-popover
          placement="top-start"
          title="作者信息"
          width="240"
          trigger="hover"
        >
          <div>
            <div>@son:Z09418208</div>
            <div>@sname:蒋伟伟</div>
            <div>@email:1754082565@qq.com</div>
          </div>
          <el-link :underline="false" slot="reference"> 关于</el-link>
        </el-popover>
      </span>
    </div>
  </header>
</template>
 
<script>
import Cookies from 'js-cookie';
export default {
  name: 'HeaderPart',
  methods: {
    toIndex() {
      if (this.$route.path === '/PC/index') {
        this.$message({
          type: 'info',
          message: '尊敬的用户，您当前正在首页。',
          showClose: true,
        });
      } else {
        this.$router.push('/PC/index');
      }
    },
    toPage(item) {
      // console.log(item);
      this.$router.push(item);
    },
    logout() {
      this.$store.state.userInfo = null;
      Cookies.remove('isLogin');
    },
    helloUser() {
      let jokes = [
        '长颈鹿嫁给了猴子，一年后长颈鹿提出离婚：我再也不要过这种上蹿下跳的日子了！猴子大怒：离就离！谁见过亲个嘴还得爬树的！',
        '鱼说：“我时时刻刻把眼睁开是为了在你身边不舍离开。”水说：“我终日流淌不知疲倦是为了围绕你好好把你抱起。”锅说：“都他妈快熟了还这么倔。”',
        '吃饭了吗？请接收短信。大象把大便排在路中央，一只蚂蚁正好路过，它抬头望了望那云雾缭绕的顶峰，不禁唱到：呀啦索，这就是青藏高原！',
        '你都长大了，有些事应该让你知道了：天，是用来刮风下雨的；地，是用来长花长草的；我，是用来证明人类是多伟大的；你是用来炖粉条的。',
        '那天你参加球赛，只见你一记凌空抽射，守门员还没反应过来，球进了！我们都为你鼓掌欢呼，你爬起来，拍拍屁股说：妈的，地太滑了！',
        '当你拿起镜子，看着自己那圆圆的脸，高高的鼻，迷人的眼，性感的嘴，有福的耳，你会大声的感叹----猪啊！',
        '众水族给老龙王祝寿，席间龟丞相从怀中掏出一物，看了看，又放了回去。龙王忙问：龟丞相又有何事？虾兵蟹将赶紧答道：老王八又收到短信了。',
      ];
      let random = Math.floor(Math.random() * jokes.length);
      this.$notify({
        title: 'Hello world',
        position: 'top-left',
        message: jokes[random],
        type: 'success',
      });
    },
  },
};
</script>

<style scoped>
#header span {
  color: #999;
  /* font-size: 14px; */
}
#header {
  width: 100%;
  height: 25px;
  background-color: #e3e4e8;
  /* background-color: #F2F6FC; */
  padding: 0 0;
}
#content {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
}
.rightLink {
  position: absolute;
  right: 0;
}
</style>