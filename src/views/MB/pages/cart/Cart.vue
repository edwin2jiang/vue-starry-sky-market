<template>
  <div id="cart">
    <div class="top">
      <div class="first-line">
        <h1>购物车</h1>
        <div class="rightBtn">管理</div>
      </div>
      <div>总计{{ getCartsLength }}件宝贝</div>
    </div>
    <div class="goodsList">
      <goods-card
        v-for="(item, index) in goodsList"
        :key="index"
        :goods="item"
      ></goods-card>
    </div>
    <div class="bottom">
      <el-checkbox :value="getIsAllChosen" @change="changeSelectAll()"
        >全选</el-checkbox
      >
      <div class="sum">
        总价格：
        <span class="rmb"> ¥ </span>
        <span class="total inline-block">
          {{ getCheckedGoodsValue }}
        </span>
        <van-button round type="info" size="small" @click="onSubmit()"
          >订单结算</van-button
        >
      </div>
    </div>
  </div>
</template>
 
<script>
import GoodsCard from 'MB/components/GoodsCard';
import { Toast } from 'vant';
export default {
  name: 'Cart',
  components: {
    GoodsCard,
  },
  data() {
    return {
      goodsList: [],
      allChecked: false,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.goodsList);
      let flag = false;
      this.goodsList.forEach((item) => {
        if (item['isChosen']) flag = true;
      });

      if (flag) {
        Toast({
          message: '感谢您的支持，但您的余额似乎不足！',
          icon: 'https://img.yzcdn.cn/vant/logo.png',
          overlay: true,
        });
      } else {
        Toast({
          message: '您还没有选择商品！',
          icon: 'https://img.yzcdn.cn/vant/logo.png',
          overlay: true,
        });
      }
    },
    changeSelectAll() {
      let beforeValue = this.getIsAllChosen;
      if (beforeValue) {
        // 当beforeValue值为true ===>  点击后，check-box全部取消选择
        this.goodsList.forEach((item) => {
          this.$set(item, 'isChosen', false);
        });
      } else {
        this.goodsList.forEach((item) => {
          this.$set(item, 'isChosen', true);
        });
      }
    },
  },
  computed: {
    getCartsLength() {
      let userInfo = this.$store.state.userInfo;
      return userInfo === undefined || userInfo === null
        ? 0
        : userInfo.carts.length;
    },
    getIsAllChosen() {
      let list = this.goodsList;
      let flag = true;
      list.forEach((item) => {
        if (item.isChosen === false) flag = false;
      });
      return flag === true ? true : false;
    },
    getCheckedGoodsValue() {
      let sum = 0;
      this.goodsList.forEach((item) => {
        if (item['isChosen'] === true) {
          sum += item['num'] * item['价格'];
        }
      });
      return sum;
    },
  },
  created() {
    let userInfo = this.$store.state.userInfo;
    if (userInfo === undefined || userInfo === null) return [];
    else {
      let goods = userInfo.carts;
      console.log(goods);
      goods.forEach((item, index) => {
        this.$set(item, 'isChosen', false); // 这里，给对象添加属性，用$set方法。
      });
      this.goodsList = goods;
    }
  },
};
</script>

<style scoped>
#cart {
  padding: 0 0 6rem 0;
}

.top {
  height: 4rem;
  padding: 1rem 2rem;
  background: #fff;
  color: #aaa;
}

.top .first-line {
  display: flex;
  justify-content: space-between;
}

.bottom {
  padding: 10px 20px;
  background: #fff;
  border-top: 0.01rem #ddd solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sum {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sum .rmb,
.sum .total {
  color: #ff0033;
}

.sum .total {
  font-size: 16px;
  padding: 0 10px 0 4px;
}
</style>