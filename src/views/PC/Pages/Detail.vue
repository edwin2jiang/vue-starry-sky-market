<template>
  <div>
    <header-part />
    <search-simple />
    <!-- 定位购物车所用图片 -->
    <div class="toImg">
      <transition name="shop_cart">
        <img
          :src="imgs[0]"
          v-if="isShow"
          alt=""
          width="80px"
          height="80px"
          class="my_img"
        />
      </transition>
    </div>
    <!-- /定位购物车所用图片 -->
    <!-- 商品详情 -->
    <div class="detail">
      <div class="core">
        <div class="top" style="display: flex">
          <!-- 主要图片区 -->
          <div class="imgs">
            <div class="mainImg">
              <pic-zoom
                :url="getMainImg || '/static/loading.png'"
                :scale="2"
              ></pic-zoom>
            </div>
            <div class="outerBox">
              <div class="rowBtn left" @click="moveLeft">
                <i class="el-icon-arrow-left"></i>
              </div>
              <div class="box">
                <div ref="innerBox" class="innerBox">
                  <div
                    class="imgItem inline-block"
                    v-for="(item, index) in imgs"
                    :key="index"
                    @mouseover="hoverImg(index)"
                  >
                    <img :src="item" alt="图片" width="60px" height="60px" />
                  </div>
                </div>
              </div>
              <div class="rowBtn left" @click="moveRight">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
          <!-- /主要图片区 -->
          <!-- 右侧部分 -->
          <div class="right">
            <div class="title">
              {{ goodsDeatail['标题'] }}
            </div>
            <div class="subtitle" style="color: #e4393c; font-size: 12px">
              新品速发！【购机送豪礼：白条6期免息+多重豪礼++运费险+嗮图赠价值199元运动蓝牙耳几】4000毫安电池，1600万像素，人脸识别！
            </div>
            <div class="secKill">
              <i class="el-icon-alarm-clock" style="font-size: 18px"></i>
              <span>商城秒杀</span>
            </div>
            <div class="valueCard">
              <div class="value">
                <span class="label">秒杀价：</span>
                <span class="rmb">¥</span>
                <span>
                  {{ goodsDeatail['价格'] }}
                </span>
              </div>
              <div class="cuxiao">
                <span class="label">促销品：</span>
                <span class="free">
                  <span>
                    <el-tag type="danger" size="small" effect="plain">
                      赠品
                    </el-tag>
                  </span>
                  <span v-for="(item, index) in 4" :key="index">
                    <img
                      src="/static/images/promotion/4.jpg"
                      alt="信息"
                      title="新品速发 6+128G 6.3吋珍珠全面屏学生游戏智能手机 炫彩玻璃机身 侧面指纹 梦幻蓝(全网通5G+64G)"
                      width="30px"
                      height="30px"
                      style="vertical-align: text-bottom"
                    />
                    <span class="multi">×1</span>
                  </span>
                </span>
                <div class="limitBuy">
                  <el-tag type="danger" size="small" effect="plain">
                    限购
                  </el-tag>
                  <span class="des">
                    该商品购买1-20件时享受单件价秒杀价，超出数量以结算价为准，仅限购买一次
                  </span>
                </div>
              </div>
            </div>

            <el-divider></el-divider>

            <div class="buyType">
              <div>
                <span class="label"> 选择款式： </span>
                <el-tag type="primary" size="small" effect="plain"
                  >珊瑚蓝</el-tag
                >
                <el-tag type="info" size="small" effect="plain"
                  >官方标配</el-tag
                >
                <el-tag type="info" size="small" effect="plain">耀世金</el-tag>
                <el-tag type="info" size="small" effect="plain">珊瑚蓝</el-tag>
                <el-tag type="info" size="small" effect="plain">星空灰</el-tag>
              </div>
              <div>
                <span class="label"> 增值服务: </span>
                <el-button size="mini">
                  <i class="el-icon-mobile-phone"></i>
                  三年质保</el-button
                >
                <el-button size="mini">
                  <i class="el-icon-mobile-phone"></i>
                  二年更换电池
                </el-button>
                <el-button size="mini">
                  <i class="el-icon-mobile-phone"></i>
                  一年换新</el-button
                >
              </div>
              <div>
                <span class="label"> 白条分期: </span>
                <el-button size="mini">
                  <i class="el-icon-money"></i>
                  {{ goodsDeatail['价格'] }} × 不分期
                </el-button>
                <el-button size="mini">
                  <i class="el-icon-tickets"></i>
                  ¥{{ getDivied(3) }} × 3期
                </el-button>
                <el-button size="mini">
                  <i class="el-icon-tickets"></i>
                  ¥{{ getDivied(6) }}×6期
                </el-button>
                <el-button size="mini">
                  <i class="el-icon-tickets"></i>
                  ¥{{ getDivied(12) }}×12期
                </el-button>
              </div>
            </div>

            <el-divider></el-divider>

            <div class="buyArea">
              <div class="label">数量：</div>
              <div>
                <el-input-number
                  size="small"
                  v-model="num"
                  controls-position="right"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </div>
              <div>
                <el-button type="danger" @click="addToCart"
                  >加入购物车</el-button
                >
              </div>
            </div>

            <div class="text" style="font-size: 14px; color: #aaa">
              温馨提示 · 支持7天无理由退货
            </div>
          </div>
          <!-- /右侧部分 -->
        </div>
        <!-- 底部部分 -->
        <div class="bottom">
          <div class="shopCard">
            <el-card shadow="hover" body-style="padding:2px">
              <div class="shopTitle">
                {{ goodsDeatail['店铺名称'] || '常开泰达手机店' }}
              </div>
              <div style="margin-left: 8px; margin-top: 6px">
                <div class="star" style="display: flex">
                  <span>店铺星级</span>
                  <el-rate
                    :value="4.5"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}"
                  >
                  </el-rate>
                </div>
                <div class="goodsComment">
                  <span>商品评价</span>
                  <span class="comment"> 9.65 高 </span>
                </div>
                <div class="goodsComment">
                  <span>物流旅约</span>
                  <span class="comment">9.28 高</span>
                </div>
                <div class="goodsComment">
                  <span>售后服务</span>
                  <span class="comment">9.39 高</span>
                </div>
              </div>
              <el-divider></el-divider>

              <div class="allCenter" style="padding-bottom: 20px">
                <el-button type="info" plain size="small">
                  <i class="el-icon-shopping-bag-2"></i>
                  进店逛逛
                </el-button>
                <el-button type="info" plain size="small">
                  <i class="el-icon-star-on"></i>
                  关注店铺
                </el-button>
              </div>
            </el-card>
          </div>
          <div class="bottomRight">
            <el-tabs type="border-card">
              <el-tab-pane label="商品详情">
                <div v-html="goodsDeatail['详情HTML']"></div>
              </el-tab-pane>
              <el-tab-pane label="规格与包装">
                <div style="color: #aaa" class="sizeBox">
                  <div style="width:350px" v-for="(item, index) in getCanshu" :key="index">
                    {{ item }}
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="商品评论">
                <comments />
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- /底部部分 -->
      </div>
    </div>
    <!-- /商品详情 -->
  </div>
</template>
 
<script>
import HeaderPart from 'PC/header/HeaderPart.vue';
import SearchSimple from 'PC/search/SearchSimple.vue';
import PicZoom from 'vue-piczoom';
import Comments from 'PC/components/Comments.vue';

export default {
  name: 'Detail',
  components: { HeaderPart, SearchSimple, PicZoom, Comments },
  data() {
    return {
      goodsDeatail: '',
      sku: this.$route.params.id,
      index: 0,
      imgs: [],
      num: 1,
      isShow: false,
      left: 0,
      imgWidth: 60,
      meanwhileNum: 6,
    };
  },
  computed: {
    getMainImg() {
      return this.imgs[this.index];
    },
    getCanshu() {
      // 数组[0] 是一个空元素，所以需要splice(1),删去第一个元素
      return (this.goodsDeatail['商品基本参数'] || '').split('\n').splice(1);
    },
    imgNum() {
      return this.imgs.length || 0;
    },
  },
  methods: {
    moveLeft() {
      // console.log(`translateX(${this.left + 20}px)`);
      if (this.left < 0) {
        this.$refs.innerBox.style['transform'] = `translateX(${
          this.left + 30
        }px)`;
        this.left += 30;
      }
    },
    moveRight() {
      // console.log(`translateX(${this.left + 20}px)`);
      let minLeft = 0 - (this.imgNum - this.meanwhileNum) * this.imgWidth;
      if (minLeft < this.left) {
        this.$refs.innerBox.style['transform'] = `translateX(${
          this.left - 30
        }px)`;
        this.left -= 30;
      }
    },
    hoverImg(index) {
      this.index = index;
    },
    getDivied(value) {
      return (this.goodsDeatail['价格'] / value || 5000).toFixed(2);
    },
    addToCart() {
      let item = this.goodsDeatail;
      item['num'] = this.num;

      let users = JSON.parse(localStorage.getItem('users'));
      let userInfo = this.$store.state.userInfo;
      if (userInfo === null) {
        this.$message({
          showClose: true,
          message: '尊敬的用户，请您先完成登录!',
          type: 'info',
        });
        this.$router.push('/PC/login?isLogin=true');
      } else {
        // 加载动画
        this.isShow = true;
        // 添加类名的方法没有动画结束的时机,这里我直接写了一个定时器,时机和动画时间一致,在图片移动到购物车位置时隐藏
        setTimeout(() => {
          this.isShow = false;
        }, 1000);

        // 过滤出当前登录的用户
        let currentUser = users.filter((item) => {
          return item['username'] === userInfo['username'];
        })[0];
        console.log(currentUser);
        currentUser.carts.push(item);
        this.$store.state.userInfo = currentUser;

        let i = users.find((item) => item.username == userInfo['username']);
        console.log('该用户对应的索引是' + users.indexOf(i));

        users.splice(users.indexOf(i), 1, currentUser);
        // 更新本地存储和state中的值
        localStorage.setItem('users', JSON.stringify(users));
        this.$store.commit('updateUsers', users);

        // this.$message({
        //   type: 'success',
        //   message: '成功添加到购物车',
        // });
      }
    },
  },
  // 加载出goodDetail信息
  beforeCreate() {
    this.$axios({
      type: 'get',
      url: '/static/data/goodsDetails.json',
    })
      .then((res) => {
        console.log('执行了生命周期函数');
        let data = res.data;
        // console.log(data);
        const d = data.filter((item) => {
          return item.sku == this.$route.params.id;
        });
        // console.log(d[0]);
        this.goodsDeatail = d[0];

        // 处理轮播图
        let str = this.goodsDeatail['轮播图'];
        // console.log(this.goodsDeatail['轮播图']);
        // 字符串处理
        let arr = str.split('/\r\n');
        arr[arr.length - 1] = arr[arr.length - 1].substring(
          0,
          arr[arr.length - 1].length - 1
        );
        // console.log(arr);
        this.imgs = arr;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.toImg {
  position: absolute;
  top: 25px;
  left: 965px;
  z-index: 999;
}

.shop_cart-enter-active {
  transition: all 1s ease-out;
}

.shop_cart-enter {
  opacity: 0;
  transform: scale(0.5);
  transform: translate(-965px, 780px);
}

.rowBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 88px;
  background: #fff;
  cursor: pointer;
}

.rowBtn:hover i {
  color: #aaa !important;
}

.rowBtn i {
  color: #ddd;
  font-size: 40px;
}

.sizeBox{
  width: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.pic-box {
  width: 500px;
  height: 500px;
}

.detail {
  width: 1200px;
  margin: 20px auto;
}
.detail .imgs {
  background: #fff;
  padding: 2px;
}

.detail .imgs .outerBox {
  margin-left: 8px;
  display: flex;
}

.detail .imgs .box {
  width: 360px;
  margin: 12px 0;
  overflow: hidden;
}

.detail .imgs .innerBox {
  display: flex;
  flex-wrap: nowrap;
}

.detail .imgs .mainImg {
  width: 450px;
  height: 450px;
  border: 1px solid #eee;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail .core .right {
  background: #fff;
  padding: 4px 10px;
}

.detail .core .right .title {
  color: #444;
}

.detail .core .right .secKill {
  padding: 2px 4px;
  background: url('/static/images/seckilling.jpg');
  color: #fff;
}

.detail .core .right .valueCard {
  padding: 10px 4px;
  background: #f3f3f3;
}

.detail .core .right .label {
  font-size: 14px;
  color: #333;
  letter-spacing: 4px;
}

.detail .core .right .valueCard .rmb {
  font-size: 12px;
  color: #333;
  color: #e4393c;
}

.detail .core .right .valueCard .value {
  font-size: 20px;
  color: #e4393c;
}

.detail .core .right .free .multi {
  color: #e4393c;
}

.detail .core .right .free img {
  margin: 2px 4px;
}

.limitBuy {
  margin-left: 76px;
  font-size: 14px;
  color: #333;
  margin-top: 4px;
}

.buyType div:nth-child(2) {
  margin: 6px 0;
}

.buyArea {
  display: flex;
  justify-content: left;
  align-items: center;
}

.buyArea div:nth-child(2) {
  margin: 20px;
}

.shopCard {
  width: 210px;
  height: 230px;
  margin-right: 60px;
  border-radius: 8px;
  /* border: 1px solid #eee; */
  background: #fff;
  color: #999;
}

.shopCard .shopTitle {
  color: #666666;
  font-size: 18px;
  font-weight: 500;
  background: #f7f7f7;
  text-align: center;
  padding: 8px 0;
}

.comment {
  color: #8fc1b1;
}

.bottom {
  display: flex;
  margin-top: 20px;
}

.el-card__body {
  padding: 2px !important;
}
</style>