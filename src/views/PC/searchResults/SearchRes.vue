<template>
  <div class="search">
    <!-- 搜索结果展示 -->
    <div class="core fullWidth infinite-list" style="overflow: auto">
      <template v-if="goodsList.length != 0">
        <div
          class="card infinite-list-item pointer"
          v-for="(item, index) in goodsList"
          :key="index"
          @click="toPage(item, item['价格'] != '')"
        >
          <img :src="getMainImg(item)" alt="" width="150px" height="150px" />
          <div class="des">
            <div>
              {{ item['标题'] || '现已停售' }}
            </div>
          </div>
          <div
            class="footer"
            style="
              display: flex;
              color: #f00;
              font-size: 14px;
              align-items: flex-end;
            "
          >
            <div class="prefix" v-if="item['价格'] != ''">¥</div>
            <div class="value" style="font-size: 18px; font-weight: 600">
              {{ item['价格'] || '现已停售' }}
            </div>
          </div>
        </div>
      </template>
      <!-- 搜索结果为空显示 -->
      <template v-else>
        <div class="fullWidth bgWhite msgCard">
          <h2>暂无相关信息，请重新搜索！（例如搜索小米、apple、三星等）</h2>
        </div>
      </template>
      <!-- /搜索结果为空显示 -->
    </div>
    <!-- /搜索结果展示 -->
    <!-- 底部按钮 -->
    <div class="block bottomCard">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNum"
      >
      </el-pagination>
    </div>
    <!-- /底部按钮 -->
  </div>
</template>
 
<script>
export default {
  name: 'SearchRes',
  data() {
    return {
      qs: this.$route.query.q,
      size: this.$route.query.size,
      page: this.$route.query.page,
      goodsList: [],
      totalNum: 0,
    };
  },
  computed: {
    getMainImg() {
      return (item) => {
        let str = item['轮播图'];
        let arr = str.split('/\r\n');
        return arr[0] || '/static/images/picNotFound.jpg';
      };
    },
    currentPage() {
      return this.$route.query.page - 0 || 1;
    },
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      let { page, q } = this.$route.query;
      this.$router.push(`/PC/search?q=${q}&page=${page}&size=${val}`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      let { size, q } = this.$route.query;
      this.$router.push(`/PC/search?q=${q}&page=${val}&size=${size}`);
    },
    getGoodsList() {
      let query = {
        qs: this.qs,
        size: this.size,
        page: this.page,
        this: this,
      };
      this.$store.dispatch('searchGoods', query);
    },
    toPage(item, value) {
      if (value == true) {
        this.$router.push('/PC/detail/' + item['sku']);
      }
    },
  },
  watch: {
    $route: function (val, oldVal) {
      // this.getInit();
      console.log('发生了改变');
      this.qs = val.query.q;
      this.page = val.query.page;
      this.size = val.query.size;
      this.getGoodsList();
    },
  },
  beforeMount() {
    this.getGoodsList();
  },
};
</script>

<style scoped>
.bottomCard {
  margin: 10px;
  border-radius: 8px;
  text-align: center;
  background: #fff;
  padding: 20px;
}
.msgCard {
  border-radius: 10px;
  padding: 100px;
  text-align: center;
  color: #666;
}
.search {
  width: 1200px;
  margin: 20px auto 10px;
}

.recommend {
  text-align: center;
}

.recommend .text {
  padding: 20px 0;
  color: #000;
  font-size: 30px;
  font-weight: 600;
}

.core {
  display: flex;
  flex-wrap: wrap;
}

.core .card {
  width: 220px;
  height: 320px;
  margin: 6px 4px 6px 6px;
  padding: 0 2px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.core .card .des {
  color: #666;
  font-size: 14px;
  width: 200px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>