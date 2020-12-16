<template>
  <div id="app">
    <div class="content">
      <el-row type="flex" align="middle" class="row">
        <el-col :span="4">
          <router-link to="/PC/">
            <div>
              <img src="/static/logo.png" alt="" />
            </div>
          </router-link>
        </el-col>
        <el-col :span="20">
          <!-- 搜索框第一行 -->
          <el-row>
            <el-col :span="12" :push="1">
              <el-row>
                <el-col>
                  <div style="margin-top: 4px">
                    <el-autocomplete
                      v-model="searchData"
                      :fetch-suggestions="querySearch"
                      placeholder="请输入内容"
                      :trigger-on-focus="true"
                      @select="handleSelect"
                      style="display: block"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                      ></el-button>
                    </el-autocomplete>
                  </div>
                </el-col>
              </el-row>
              <el-row
                :gutter="0"
                type="flex"
                justify="space-between"
                style="margin-top: 4px"
              >
                <el-col>
                  <el-link :underline="false">手机降价</el-link>
                </el-col>
                <el-col>
                  <el-link :underline="false">电脑数码</el-link>
                </el-col>
                <el-col>
                  <el-link :underline="false">电脑促销</el-link>
                </el-col>
                <el-col>
                  <el-link :underline="false">运动大牌</el-link>
                </el-col>
                <el-col>
                  <el-link :underline="false">潮流服装</el-link>
                </el-col>
                <el-col>
                  <el-link :underline="false">居家暖冬</el-link>
                </el-col>
                <el-col>
                  <el-link :underline="false">大雪节气</el-link>
                </el-col>
                <el-col>
                  <el-link :underline="false">家装纸品</el-link>
                </el-col>
              </el-row>
            </el-col>
            <!-- 购物车 -->
            <el-col :span="4" :push="2" style="margin-top: 4px">
              <router-link to="/PC/cart">
                <el-badge :value="getCartsLength" :max="99" class="item">
                  <el-button icon="el-icon-shopping-cart-full" size="medium">
                    我的购物车</el-button
                  >
                </el-badge>
              </router-link>
            </el-col>
            <!-- /购物车 -->
          </el-row>
          <!-- /搜索栏第一行 -->
          <!-- 搜索栏第二行 -->
          <el-row class="searchList" :gutter="8">
            <el-col v-for="(item, index) in lists" :key="index" :span="2">
              <el-link :underline="false">
                {{ item }}
              </el-link>
            </el-col>
          </el-row>
          <!-- /搜索栏第二行 -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'Search',
  data() {
    return {
      searchData: '',
      restaurants: [],
      lists: [
        '秒杀',
        '优惠券',
        '超级会员',
        '品牌闪购',
        '京东拍卖',
        '京东家电',
        '京东超市',
        '京东生鲜',
        '京东国际',
        '京东金融',
      ],
    };
  },
  computed: {
    getCartsLength() {
      if (this.$store.state.userInfo === null) {
        return 0;
      } else {
        return this.$store.state.userInfo.carts.length || 0;
      }
    },
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        // 根据关键词生成正则表达式
        let patt = new RegExp(queryString.toLowerCase());
        // console.log (patt);
        // console.log (queryString.toLowerCase());
        // 过滤返回出符合结果的数据
        return patt.test(restaurant.value.toLowerCase());
      };
    },
    loadAll() {
      return [
        { value: '手机 | 小米手机' },
        { value: '手机 | 三星手机' },
        { value: '手机 | 苹果手机' },
        { value: '手机 | 华为手机' },
        { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
        {
          value: 'Hot honey 首尔炸鸡（仙霞路）',
          address: '上海市长宁区淞虹路661号',
        },
        {
          value: '新旺角茶餐厅',
          address: '上海市普陀区真北路988号创邑金沙谷6号楼113',
        },
        { value: '泷千家(天山西路店)', address: '天山西路438号' },
        {
          value: '胖仙女纸杯蛋糕（上海凌空店）',
          address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101',
        },
        { value: '贡茶', address: '上海市长宁区金钟路633号' },
        {
          value: '豪大大香鸡排超级奶爸',
          address: '上海市嘉定区曹安公路曹安路1685号',
        },
        {
          value: '茶芝兰（奶茶，手抓饼）',
          address: '上海市普陀区同普路1435号',
        },
        { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
        { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
        { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
        { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
        {
          value: 'Monica摩托主题咖啡店',
          address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F',
        },
        {
          value: '浮生若茶（凌空soho店）',
          address: '上海长宁区金钟路968号9号楼地下一层',
        },
      ];
    },
    handleSelect(item) {
      console.log(item);
      this;
    },
  },
  mounted() {
    this.restaurants = this.loadAll();
  },
};
</script>

<style scoped>
#app {
  background-color: #fff;
  height: 200px;
  box-shadow: 0 4px 4px #ccc;
}

.content {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
}

.row {
  height: 100%;
}

.searchList {
  position: relative;
  top: 38px;
}

.searchList .el-link {
  font-size: 16px;
}
</style>