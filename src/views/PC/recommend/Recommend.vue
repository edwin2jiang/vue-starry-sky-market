<template>
  <div class="fullWidth recommend">
    <span class="text inline-block">今日推荐</span>
    <div class="core fullWidth infinite-list" style="overflow: auto">
      <div
        class="card infinite-list-item pointer"
        v-for="(item, index) in getListData"
        :key="index"
        @click="toPage(item)"
      >
        <img :src="item['图片地址']" alt="" width="150px" height="150px" />
        <div class="des">
          <div>
            {{ item['商品名称'].substring(0, 40) + '...' }}
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
          <div class="prefix">¥</div>
          <div class="value" style="font-size: 18px; font-weight: 600">
            {{ item['价格'] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'Recommend',
  data() {
    return {
      count: this.$store.getters.getStoreCount,
      lists: [],
    };
  },
  computed: {
    getListData() {
      return this.lists.slice(0, this.$store.getters.getStoreCount);
    },
  },
  methods: {
    load() {
      // this.count += 5;
      this.$store.commit('increaseCount');
    },
    toPage(item) {
      this.$router.push('/PC/detail/' + item.sku);
    },
    scrollTo() {
      // 滚动视口高度(也就是当前元素的真实高度)
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      // 可见区域高度
      let clientHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      // 滚动条顶部到浏览器顶部高度
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // console.log (clientHeight);
      // console.log (scrollTop);
      // console.log (scrollHeight);
      if (clientHeight + scrollTop + 1 >= scrollHeight) {
        // 如果数据量超过30就停止继续加载
        console.log('滚动条触底了');
        console.log(this.$store.getters.getStoreCount);
        console.log(this.$store.getters.getStoreCount >= 30);
        if (this.$store.getters.getStoreCount >= 30) {
          window.removeEventListener('scroll', scrollTo);
          console.log('-------------------');
          console.log('执行了移除加载事件');
        } else {
          // 一秒后执行
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
          });
          setTimeout(() => {
            this.load();
            loading.close();
          }, 1000);
        }
      }
    },
  },
  beforeMount() {
    // 获取数据
    this.$axios({
      type: 'get',
      url: '/static/data/goodsLists.json',
    })
      .then((res) => {
        this.lists = res.data.reverse();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // 监听滚轴时间 动态加载数据
  created() {
    // 创建加载监听器
    window.addEventListener('scroll', this.scrollTo);
  },
  destroyed() {
    // 监听用户离开当前页面，移除监听器
    console.log('首页-页面被销毁了');
    console.log('监控滚轴事件被移除了');
    window.removeEventListener('scroll', this.scrollTo);
  },
};
</script>

<style scoped>
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
  justify-content: space-between;
  flex-wrap: wrap;
}

.core .card {
  width: 230px;
  height: 322px;
  margin: 6px 0;
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
}
</style>