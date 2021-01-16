<template>
  <div>
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      right-text="购物车"
      left-arrow
      @click-left="onClickBack"
      @click-right="onClickRight"
    />

    <div :data-id="getCarousel">
      <van-swipe @change="onChange">
        <van-swipe-item v-for="(item, index) in getCarousel" :key="index">
          <van-image :src="item"> </van-image>
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ current + 1 }}/{{ getCarouselLength }}
          </div>
        </template>
      </van-swipe>
    </div>

    <div class="text">
      <div class="value">
        <span class="rmb"> ¥ </span>
        <span class="value"> {{ getPrice }} </span>
      </div>
      <div class="title van-multi-ellipsis--l2">
        {{ getTitle }}
      </div>
    </div>

    <div class="text box space-between">
      <div class="select">
        <span class="label">选择</span>
        <span class="txt">请选择颜色分类</span>
      </div>
      <span class="icon"> &gt; </span>
    </div>

    <Card :hasTitle="true" title="商品评论" rightText="查看所有评论">
      <template #content>
        <div class="content" v-for="(item, index) in comments" :key="index">
          <div class="top">
            <van-image
              :src="item === undefined ? '' : item.headImg"
              round
              width="3.2rem"
              height="3.2rem"
            />
            <span class="name inline-block">
              {{ item === undefined ? '' : item.name }}
            </span>
            <van-rate
              :value="item.star"
              :size="25"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="txt van-multi-ellipsis--l2 comment">
            {{ item === undefined ? '' : item.content }}
          </div>
          <div class="time">
            评论时间：
            {{ item === undefined ? '' : item.datetime }}
          </div>
          <van-divider v-if="index !== comments.length - 1" />
        </div>
      </template>
    </Card>

    <van-divider
      :style="{ color: '#aaa', borderColor: '#bbb', padding: '0 16px' }"
    >
      到底了
    </van-divider>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="toPage('/MB/cart')"
        :badge="getCartsLength"
      />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="info"
        text="加入购物车"
        @click="addToCart()"
      />
    </van-goods-action>
  </div>
</template>
 
<script>
import Card from 'MB/components/Card';

export default {
  name: 'GoodsDetail',
  components: {
    Card,
  },
  data() {
    return {
      sku: this.$route.params.id,
      current: 0,
      comments: '',
      num: 1,
    };
  },
  methods: {
    onChange(index) {
      this.current = index;
    },
    addToCart() {
      let item = this.getGoodsDetail;
      item['num'] = this.num;

      let users = JSON.parse(localStorage.getItem('users'));
      let userInfo = this.$store.state.userInfo;
      if (userInfo === null) {
        this.$message({
          showClose: true,
          message: '尊敬的用户，请您先完成登录!',
          type: 'info',
        });
        this.$router.push('/MB/login?isLogin=true');
      } else {
        // 加载动画
        // this.isShow = true;
        // // 添加类名的方法没有动画结束的时机,这里我直接写了一个定时器,时机和动画时间一致,在图片移动到购物车位置时隐藏
        // setTimeout(() => {
        //   this.isShow = false;
        // }, 1000);

        // 过滤出当前登录的用户
        let currentUser = users.filter((item) => {
          return item['username'] === userInfo['username'];
        })[0];
        console.log(currentUser);

        // 检索该用户是否已经将该商品加入购物车
        let res = this.isHaveThisGoods(currentUser, item);
        console.log(res);
        if (res) {
          let carts = currentUser.carts;
          for (let i = 0; i < carts.length; i++) {
            if (carts[i]['sku'] === item['sku']) {
              carts[i]['num'] += item['num'];
            }
          }
          console.log(currentUser.carts);
          currentUser.carts = carts;
        } else {
          currentUser.carts.push(item);
        }

        this.$store.state.userInfo = currentUser;

        let i = users.find((item) => item.username == userInfo['username']);
        console.log('该用户对应的索引是' + users.indexOf(i));

        users.splice(users.indexOf(i), 1, currentUser);
        // 更新本地存储和state中的值
        localStorage.setItem('users', JSON.stringify(users));
        this.$store.commit('updateUsers', users);
      }
    },
    onClickBack() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.toPage('/MB/cart');
    },
    isHaveThisGoods(user, goods) {
      let arr = user.carts.filter((item) => {
        return item['sku'] === goods['sku'];
      });
      console.log(arr);
      if (arr.length === 0) {
        return false;
      }
      return true;
    },
    toPage(item) {
      this.$router.push({
        path: item,
      });
    },
  },
  computed: {
    getCartsLength() {
      let userInfo = this.$store.state.userInfo;
      return userInfo === undefined || userInfo === null
        ? 0
        : userInfo.carts.length;
    },
    getGoodsDetail() {
      return this.$route.params.goodsDetail;
    },
    getCarousel() {
      if (this.getGoodsDetail !== undefined) {
        let arr = this.getGoodsDetail['轮播图'].split('/\r\n');
        // 处理最后一张图 末尾多 不正确
        arr[arr.length - 1] = arr[arr.length - 1].slice(
          0,
          arr[arr.length - 1].length - 1,
        );
        return arr;
      }
    },
    getImg(index) {
      return this.getCarousel[index];
    },
    getCarouselLength() {
      if (this.getCarousel !== undefined) return this.getCarousel.length;
      else return 0;
    },
    getPrice() {
      if (this.getGoodsDetail !== undefined) {
        return this.getGoodsDetail['价格'];
      }
    },
    getTitle() {
      if (this.getGoodsDetail !== undefined) {
        return this.getGoodsDetail['标题'];
      }
    },
    getDetail() {
      if (this.getGoodsDetail !== undefined) {
        return this.getGoodsDetail['详情HTML'];
      }
    },
  },
  created() {
    this.$axios({
      type: 'get',
      url: 'http://localhost:8080/api/comments',
    })
      .then((res) => {
        console.log(res.data.comments);
        this.comments = res.data.comments.slice(0, 3);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.custom-indicator {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  padding: 0.2rem 0.5rem;
  font-size: 1.2rem;
  background: rgba(0, 0, 0, 0.1);
}

.text {
  background: #fff;
  padding: 1rem;
  margin: 1rem 0 1rem;
}

.text .value .rmb {
  font-size: 1.4rem;
}
.text .value {
  color: #ff0036;
  font-size: 2.2rem;
}

.text .title {
  font-size: 1.4rem;
}

.text.box {
  display: flex;
}

.text.box .select .label {
  color: #aaa;
  padding: 0 1.6rem 0 0;
}

.text.box .icon {
  color: #aaa;
}

.content {
  font-size: 1.2rem;
}
.content .top {
  display: flex;
  align-items: center;
}

.content .top .name {
  padding: 0 4rem 0 2rem;
}
.content .comment {
  margin: 0.6rem 0;
}
</style>