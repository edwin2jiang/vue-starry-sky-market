<template>
  <div class="home">
    <header>
      <van-nav-bar title="星空商城">
        <template #left>
          <van-icon name="wap-nav" size="18" @click="toPage('/MB/category')" />
        </template>
        <template #title>
          <van-search
            v-model="searchValue"
            placeholder="请输入搜索关键词"
            shape="round"
          >
          </van-search>
        </template>
        <template #right>
          <span @click="toPage('/MB/login')"> 登录 </span>
        </template>
      </van-nav-bar>
    </header>

    <div class="content" width="90%">
      <div class="carousel">
        <van-swipe class="my-swipe" :autoplay="6000" indicator-color="white">
          <van-swipe-item>
            <van-image
              width="100%"
              fit="contain"
              src="/static/lunbo/lunbo-mb0.jpg"
            />
          </van-swipe-item>
          <van-swipe-item>
            <van-image
              width="100%"
              fit="contain"
              src="/static/lunbo/lunbo-mb1.jpg"
            />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="nav">
      <my-card>
        <template #content>
          <van-swipe indicator-color="#ccc">
            <van-swipe-item>
              <div class="box inline-block">
                <span class="img-box" v-for="(item, index) in 10" :key="index">
                  <van-image
                    width="4rem"
                    height="4rem"
                    :src="`/static/images/mb-mul-carousel/carousel-${index}.webp`"
                  />
                </span>
              </div>
            </van-swipe-item>
            <van-swipe-item>
              <div class="box inline-block">
                <span class="img-box" v-for="(item, index) in 10" :key="index">
                  <van-image
                    width="4rem"
                    height="4rem"
                    :src="`/static/images/mb-mul-carousel/carousel-${
                      10 + index
                    }.webp`"
                  />
                </span>
              </div>
            </van-swipe-item>
          </van-swipe>
        </template>
      </my-card>
    </div>

    <div class="goods">
      <header>
        <h2>猜你喜欢</h2>
      </header>
      <content>
        <div class="box" v-for="(item, index) in goodsList" :key="index">
          <span
            class="inline-block innerBox"
            @click="
              toPage({
                name: 'detail',
                params: {
                  id: item[0].sku,
                  goodsDetail: item[0],
                },
              })
            "
          >
            <img
              width="150"
              height="150"
              alt="图片"
              :src="getMainImg(item, 0)"
            />
            <div class="bottom">
              <div class="title van-multi-ellipsis--l2">
                {{ item[0]['标题'] }}
              </div>
              <div class="value">
                <span style="padding: 0.6rem 0 0; color: #fa2c19">
                  <span>¥</span>
                  {{ item[0]['价格'] }}
                </span>
                <span class="inline-block view"> 看相似 </span>
              </div>
            </div>
          </span>
          <span
            class="inline-block innerBox"
            @click="
              toPage({
                name: 'detail',
                params: {
                  id: item[1].sku,
                  goodsDetail: item[1],
                },
              })
            "
          >
            <img width="150" height="150" :src="getMainImg(item, 1)" alt="" />
            <div class="bottom">
              <div class="title van-multi-ellipsis--l2">
                {{ item[1]['标题'] }}
              </div>
              <div class="value">
                <span style="padding: 0.6rem 0 0; color: #fa2c19">
                  <span>¥</span>
                  {{ item[1]['价格'] }}
                </span>
                <span class="inline-block view"> 看相似 </span>
              </div>
            </div>
          </span>
        </div>
      </content>
    </div>
  </div>
</template>
 
<script>
import MyCard from '@/views/MB/components/MyCard';
export default {
  name: 'Home',
  components: {
    MyCard,
  },
  data() {
    return {
      searchValue: '',
      goodsList: [],
    };
  },
  methods: {
    getMainImg(item, index) {
      let str = item[index]['轮播图'] || '';
      let arr = str.split('/\r\n');
      return arr[0];
    },
    load() {
      this.$axios({
        type: 'get',
        url: '/static/data/goodsDetails.json',
      })
        .then((res) => {
          let data = res.data.slice(0, 10);
          let newArr = [];
          for (let i = 0; i < data.length; i += 2) {
            newArr.push([data[i], data[i + 1]]);
          }
          this.goodsList = newArr;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toPage(item) {
      this.$router.push(item);
    },
  },
  beforeMount() {
    this.load();
  },
};
</script>

<style scoped>
.home {
  margin: 0 0 8rem;
}

.text {
  font-size: 10rem;
}

.van-search {
  padding: 0 1rem;
}

.carousel {
  width: 90%;
  padding: 1rem 0 0;
  margin: 0 auto;
  border-radius: 0.6rem;
  overflow: hidden;
}

.nav {
  width: 90%;
  margin: 1rem auto 0;
}
.nav .box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 1rem 0 1.8rem;
}
.nav .box .img-box {
  padding: 0 10px;
}

.goods {
  margin: 1rem 0;
}

.goods header {
  text-align: center;
}
.goods .box {
  display: flex;
  justify-content: space-around;
}

.goods .box .innerBox {
  width: 40%;
  background: #fff;
  padding: 1rem;
  margin: 0.5rem 0;
}

.goods .bottom .value {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods .bottom .value {
  font-size: 1.6rem;
}

.goods .bottom .value .view {
  font-size: 1.4rem;
  line-height: 1.4rem;
  margin: 0.2rem;
  border: 0.1rem solid #ccc;
  color: #aaa;
  border-radius: 1rem;
  padding: 0.5rem;
}
</style>