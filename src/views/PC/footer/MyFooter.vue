<template>
  <footer class="footer">
    <el-divider></el-divider>
    <div class="box">
      <div class="first-line" v-for="(item, index) in arr1" :key="index">
        <el-link class="text">{{ item }}</el-link>
        <el-divider
          direction="vertical"
          v-if="index != arr1.length - 1"
        ></el-divider>
      </div>
    </div>
    <div class="box">
      <div class="second-line" v-for="(item, index) in arr2" :key="index">
        <span class="text">{{ item }}</span>
        <el-divider
          direction="vertical"
          v-if="index != arr2.length - 1"
        ></el-divider>
      </div>
    </div>
    <div class="box">
      <div class="second-line" v-for="(item, index) in arr3" :key="index">
        <span class="text">
          {{ item }}
        </span>
        <el-divider
          direction="vertical"
          v-if="index != arr3.length - 1"
        ></el-divider>
      </div>
    </div>
    <div class="box">
      <div class="second-line" v-for="(item, index) in arr4" :key="index">
        <span class="text">{{ item }}</span>
        <el-divider
          direction="vertical"
          v-if="index != arr4.length - 1"
        ></el-divider>
      </div>
    </div>
    <div class="box">
      <div class="second-line" v-for="(item, index) in arr5" :key="index">
        <img src="/static/logo.png" alt="" width="12px" height="12px" />
        <span class="text">{{ item }}} </span>
        <el-divider
          direction="vertical"
          v-if="index != arr5.length - 1"
        ></el-divider>
      </div>
    </div>
  </footer>
</template>
 
<script>
export default {
  name: 'MyFooter',
  data() {
    return {
      arr1: [
        '关于我们',
        '联系我们',
        '联系客服',
        '合作招商',
        '商家帮助',
        '营销中心',
        '手机京东',
        '友情链接',
        '销售联盟',
        '京东社区',
        '风险监测',
        '隐私政策',
        '京东公益',
        'English Site',
        'Media & IR',
      ],
      arr2: [
        '京公网安备 11000002000088号',
        '京ICP证070359号',
        '互联网药品信息服务资格证编号(京)-经营性-2014-0008',
        '新出发京零 字第大120007号',
      ],
      arr3: [
        '互联网出版许可证编号新出网证(京)字150号',
        '出版物经营许可证',
        '网络文化经营许可证京网文[2014]2148-348号',
        '违法和不良信息举报电话：4006561155',
      ],
      arr4: [
        'Copyright © 2004 - 2020  京东JD.com 版权所有',
        '消费者维权热线：4006067733经营证照',
        '(京)网械平台备字(2018)第00003号',
        '营业执照 ',
      ],
      arr5: [
        'Global Site',
        'Сайт России',
        'Situs Indonesia',
        'Sitio de España',
        'เว็บไซต์ประเทศไทย',
      ],
    };
  },
};
</script>

<style scoped>
.footer {
  background: #fff;
}

.footer .box {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.footer .first-line {
  color: #666;
  font-size: 14px;
}

.footer {
  color: #999;
  font-size: 13px;
  padding-bottom: 18px;
}
</style>