<template>
  <div>
    <header-part />
    <div class="pay">
      <div class="addresses">
        <el-card shadow="never">
          <div slot="header">确认收货地址</div>
          <div>
            <el-radio-group v-model="radio">
              <div
                class="selectItem"
                v-for="(item, index) in address"
                :key="index"
              >
                <el-radio :label="index">
                  <span>{{ item.province }}</span>
                  <span>{{ item.city }}</span>
                  <span>{{ item.subCity }}</span>
                  <span>{{ item.town }}</span>
                  <span>{{ item.DetailAddress }}</span>
                  <span> ({{ item.name }} 收) </span>
                  <span>
                    {{ item.phone }}
                  </span>
                </el-radio>
              </div>
            </el-radio-group>
          </div>
        </el-card>
      </div>
      <div class="goods">
        <el-card shadow="never">
          <div slot="header">确认订单信息</div>
          <div>
            <div class="goodsItem" v-for="(item, index) in data" :key="index">
              <el-card shadow="hover">
                <div style="position: relative; top: 0; left: 0">
                  <div class="main">
                    <div class="name">
                      <div class="img">
                        <img
                          :src="getMainImg(item)"
                          alt="商品主图"
                          width="120px"
                          height="120px"
                        />
                      </div>
                      <div class="title">{{ item['标题'] }}</div>
                    </div>
                    <div class="value">
                      <div>单价</div>
                      <div>
                        <span>¥</span>
                        {{ item['价格'] }}
                      </div>
                    </div>
                    <div class="num">
                      <div>数量</div>
                      <div>
                        {{ item['num'] }}
                      </div>
                    </div>
                    <div class="calc">
                      <div>小计</div>
                      <div>
                        <span>¥</span>
                        {{ getCalc(item) }}
                      </div>
                    </div>
                  </div>
                  <div class="transport">
                    <div>运输方式: 普通快递（运费免邮）</div>
                    <div>运费险：卖家赠送，退换货可赔</div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
          <el-divider />
          <div class="bottom">
            收银台 | 结账
            <div class="core">
              <!-- 支付面板 -->
              <el-card shadow="never">
                <div>
                  <span>总计：</span>
                  <span>¥</span>
                  <span>
                    {{ getTotal() }}
                  </span>
                </div>
                <div>
                  <span>寄送至：</span>
                  <span>
                    {{ getAddress() }}
                  </span>
                </div>
                <div>
                  <span>收件人：</span>
                  <span>{{ address[radio]['name'] }} </span>
                  <span>{{ address[radio]['phone'] }}</span>
                </div>
              </el-card>
              <!-- 支付面板 -->
              <div class="submitBtn">
                <el-button type="primary" @click="submitPay()">
                  提交订单
                </el-button>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <my-footer />
  </div>
</template>
 
<script>
import MyFooter from '../footer/MyFooter.vue';
import HeaderPart from '../header/HeaderPart.vue';
export default {
  components: { MyFooter, HeaderPart },
  name: 'Pay',
  des: '用户支付页面',
  data() {
    return {
      time: 5,
      radio: 0,
      data: this.$route.params.data,
      address: [
        {
          province: '江苏省',
          city: '苏州市',
          subCity: '常熟市',
          town: '虞山镇',
          DetailAddress: '阜湖路45号',
          name: '夏东海',
          phone: '18852937269',
        },
        {
          province: '江苏省',
          city: '苏州市',
          subCity: '常熟市',
          town: '虞山镇',
          DetailAddress: '阜湖路50号',
          name: '赵东来',
          phone: '18852939969',
        },
        {
          province: '英国',
          city: '伦敦',
          subCity: '',
          town: '',
          DetailAddress: '贝克街221B',
          name: '福尔摩斯',
          phone: '13952939969',
        },
      ],
    };
  },
  created() {
    console.log(this.$route);
  },
  methods: {
    getCalc(item) {
      return (item['价格'] * item['num']).toFixed(2);
    },
    getMainImg(item) {
      let str = item['轮播图'];
      let arr = str.split('/\r\n');
      return arr[0];
    },
    getTotal() {
      let total = 0;
      this.data.forEach((item) => {
        total += item['价格'] * item['num'];
      });
      return total.toFixed(2);
    },
    getAddress() {
      let obj = this.address[this.radio];
      let str =
        obj['province'] +
        ' ' +
        obj['city'] +
        ' ' +
        obj['subCity'] +
        ' ' +
        obj['town'] +
        ' ' +
        obj['DetailAddress'];
      return str;
    },
    submitPay() {
      // console.log('支付成功');
      // console.log(this.data);

      let str = `总计：${this.getTotal()} , 是否继续支付？`;

      this.$confirm(str, '支付提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'primary',
        center: true,
      })
        .then(() => {
          let users = JSON.parse(localStorage.getItem('users'));
          let userInfo = this.$store.state.userInfo;
          // 首先过滤出当前登录的用户
          let currentUser = users.filter((item) => {
            return item['username'] === userInfo['username'];
          })[0];
          console.log(currentUser);
          // 购物车选择购买的元素清空

          let flag;
          currentUser.carts = currentUser.carts.filter((item) => {
            flag = 0;
            this.data.forEach((element) => {
              if (element['sku'] === item['sku']) {
                flag = 1;
              }
            });
            // flag一直为0，则说明没有被选择
            return flag === 0 ? true : false;
          });

          this.$store.state.userInfo = currentUser;

          let i = users.find((item) => item.username == userInfo['username']);
          console.log('该用户对应的索引是' + users.indexOf(i));

          users.splice(users.indexOf(i), 1, currentUser);
          // 更新本地存储和state中的值
          localStorage.setItem('users', JSON.stringify(users));
          this.$store.commit('updateUsers', users);
          // 更新当前页面中的数据
          this.data = [];
          this.$message({
            type: 'success',
            message: '支付成功，感谢您对本商场的支持！',
          });
          this.$router.push('/PC/index');
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消支付',
          });
        });
    },
  },
};
</script>

<style scoped>
.pay {
  width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
}

.selectItem {
  margin: 10px 0;
}

.goods {
  margin-top: 30px;
}

.pay .goods .name {
  display: flex;
}

.pay .goods .title {
  width: 200px;
  height: 70%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.pay .goods .main {
  display: flex;
  justify-content: space-between;
  text-align: center;
}

.pay .goods .transport {
  position: absolute;
  right: 100px;
  bottom: 4px;
}

.pay .goods .transport {
  color: #666;
}

.pay .goods .transport > div {
  padding: 2px 0;
}

.goodsItem {
  margin-bottom: 20px;
}

.bottom {
  display: flex;
  justify-content: space-between;
}

.bottom .core {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.bottom .core .submitBtn {
  position: relative;
  top: 4px;
  right: 8px;
}
</style>