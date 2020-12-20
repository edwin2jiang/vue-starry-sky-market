<template>
  <div class="cart">
    <div class="core">
      <h2>我的购物车</h2>
      <el-divider></el-divider>
      <!--  -->
      <el-table
        :header-cell-style="{ 'text-align': 'center' }"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="商品" width="300" align="left">
          <template slot-scope="scope">
            <div class="goods">
              <img
                :src="getImg(scope.row['轮播图'])"
                alt="商品"
                class="pointer"
                width="120px"
                height="120px"
                @click="toPage('/PC/detail/' + scope.row['sku'])"
              />
              <span v-text="getTitle(scope.row['标题'])"> </span>
            </div>
          </template>
        </el-table-column>
        <!-- 轮播图预处理 标题 价格 num   -->
        <el-table-column align="center" prop="价格" label="单价" width="120">
        </el-table-column>
        <el-table-column
          align="center"
          prop="num"
          label="数量"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input-number
              size="small"
              v-model="scope.row['num']"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column align="center" label="小计" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>
              <span style="font-size: 12px"> ¥ </span>
              {{ getValue(scope.$index) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px" class="bottom">
        <div>
          <el-button @click="selectAll(tableData)">全选</el-button>
          <el-button @click="toggleSelection()">清空</el-button>
          <!-- <el-button @click="logSelect()">输出已经选择的</el-button> -->
        </div>

        <div class="value">
          <div class="total inline-block">
            <span>总价：</span>
            <span> ¥ </span>
            <span class="money">{{ totalValue }}</span>
          </div>
          <el-button @click="toPay()" type="primary" plain>
            立即购买
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  name: 'MyCart',
  computed: {
    totalValue() {
      // 如果数据未挂载
      if (!this.isMounted) {
        return;
      }
      let arr = this.$refs.multipleTable.selection;
      console.log(arr);
      let total = 0;
      arr.forEach((item) => {
        total += item['价格'] * item['num'];
      });
      return total;
    },
  },
  data() {
    return {
      tableData: this.$store.state.userInfo.carts,
      multipleSelection: [],
      isMounted: false,
    };
  },
  methods: {
    toPage(item) {
      this.$router.push(item);
    },
    getValue(index) {
      return (
        this.tableData[index]['价格'] * this.tableData[index]['num']
      ).toFixed(2);
    },
    toPay() {
      let arr = this.$refs.multipleTable.selection;
      if (arr.length <= 0) {
        // 购物车无商品，支付失败
        this.$message({
          type: 'warning',
          message: '请先选择商品!',
        });
      } else {
        console.log(arr);
        this.$router.push({
          name: 'pay',
          path: '/PC/pay',
          params: {
            data: arr,
          },
          query: {
            userId: 1,
          },
        });
      }
    },
    addNum(item) {
      console.log(item);
    },
    getTitle(item) {
      return item;
    },
    getImg(item) {
      // console.log(item.split("/\r\n"));
      return item.split('/\r\n')[0];
    },
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
      this.tableData.splice(index, 1);

      let users = localStorage.getItem('users');
      users = JSON.parse(users);
      let userInfo = this.$store.state.userInfo;
      // 要从localstorage中删除
      // 过滤出当前登录的用户
      let currentUser = users.filter((item) => {
        return item['username'] === userInfo['username'];
      })[0];
      console.log(currentUser);
      currentUser.carts = this.tableData;
      this.$store.state.userInfo = currentUser;

      let i = users.find((item) => item.username == userInfo['username']);
      console.log('该用户对应的索引是' + users.indexOf(i));

      users.splice(users.indexOf(i), 1, currentUser);
      // 更新本地存储和state中的值
      localStorage.setItem('users', JSON.stringify(users));
      this.$store.commit('updateUsers', users);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    selectAll(rows) {
      console.log('全选按钮被点击了');
      this.$refs.multipleTable.clearSelection();
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
    },
    logSelect() {
      console.log(this.$refs.multipleTable);
      console.log(this.$refs.multipleTable.selection);
    },
  },
  mounted() {
    this.isMounted = true;
    this.$refs.multipleTable.toggleAllSelection();
  },
};
</script>

<style scoped>
.cart {
  width: 1000px;
  margin: 40px auto;
  padding: 10px 20px;
  background: #fff;
}

.goods {
  display: flex;
  align-items: center;
}

.cart .bottom {
  display: flex;
  justify-content: space-between;
}

.cart .bottom .value {
  display: flex;
  align-items: center;
}
.cart .bottom .value {
  color: #666;
  font-size: 14px;
  padding: 0 10px;
}

.cart .bottom .value .total {
  margin: 0 8px;
}

.cart .bottom .value .money {
  font-size: 18px;
}
</style>