<template>
  <div class="card">
    <div v-if="hasTitle || 'false'" class="title">
      <div>
        <el-checkbox v-model="goods['isChosen']" />
        <div class="shopName inline-block">
          {{ goods['店铺名称'] || '官方旗舰店' }}
        </div>
      </div>

      <span class="rightText"> {{ rightText }} > </span>
    </div>
    <van-divider />
    <div class="goodsDetail">
      <div class="img">
        <van-image
          width="80px"
          height="80px"
          :src="getMainImg"
          @click="toDetailPage()"
        />
      </div>
      <div class="right">
        <div class="title van-multi-ellipsis--l2" @click="toDetailPage()">
          {{ goods['标题'] }}
        </div>
        <div class="bottom">
          <span class="price inline-block">
            <span class="rmb"> ¥ </span>
            <span class="value">
              {{ getSum }}
            </span>
          </span>
          <div class="count inline-block">
            <van-stepper v-model="goods['num']" button-size="22" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'GoodsCard',
  props: ['goods', 'rightText', 'hasTitle'],
  data() {
    return {
      num: 1,
    };
  },
  computed: {
    getMainImg() {
      let item = this.goods;
      let str = item['轮播图'] || '';
      let arr = str.split('/\r\n');
      return arr[0];
    },
    getSum() {
      let goods = this.goods;
      return goods['价格'] * goods['num'];
    },
  },
  methods: {
    handleChange(value) {},
    toDetailPage() {
      this.$router.push({
        name: 'detail',
        params: {
          id: this.goods.sku,
          goodsDetail: this.goods,
        },
      });
    },
  },
};
</script>

<style scoped>
.card {
  margin: 1rem auto;
  padding: 1rem;
  width: 90%;
  border-radius: 1rem;
  background: #fff;
}

.card .title {
  display: flex;
  font-weight: 600;
  justify-content: space-between;
}

.card .title .rightText {
  color: #ddd;
}

.card .shopName {
  padding: 0 1rem;
  max-width: 30rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card .goodsDetail {
  padding: 0 20px;
  display: flex;
}

.card .goodsDetail .title {
  color: #888;
}

.card .bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card .bottom {
  padding: 10px 0;
}

.card .bottom .price {
  font-size: 1.5rem;
  color: #666;
}
</style>