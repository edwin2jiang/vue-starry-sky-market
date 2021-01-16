<template>
  <div class="content">
    <van-tree-select
      height="100vh"
      :items="items"
      :main-active-index.sync="active"
    >
      <template #content>
        <div v-if="active === 0" class="right">
          <div class="box">
            <div class="item" v-for="(item, index) in mb" :key="index">
              <span class="inline-block img">
                <van-image
                  :src="item.logo"
                  alt="图片"
                  width="7rem"
                  height="7rem"
                />
              </span>
              <span class="txt">
                {{ item.text }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="right">
          <div class="box">
            <div class="item" v-for="(item, index) in 20" :key="index">
              <span class="inline-block img">
                <van-image
                  src="/static/images/category-logo/category-2.jpg"
                  alt="图片"
                  width="7rem"
                  height="7rem"
                />
              </span>
              <span class="txt">
                {{ '示例-' + item }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>
 
<script>
export default {
  name: 'Category',
  data() {
    return {
      active: 0,
      items: [
        { text: '热门推荐' },
        { text: '手机数码' },
        { text: '电脑办公' },
        { text: '家用电器' },
        { text: '美妆护肤' },
        { text: '汽车生活' },
        { text: '服装穿搭' },
        { text: '电脑办公' },
        { text: '图像音影' },
        { text: '食品生鲜' },
        { text: '酒水饮料' },
      ],
      mb: [
        {
          logo: '/static/images/category-logo/category-0.png',
          text: '电脑',
        },
        {
          logo: '/static/images/category-logo/category-3.png',
          text: '手机',
        },
        {
          logo: '/static/images/category-logo/category-1.jpg',
          text: '冰箱',
        },
        {
          logo: '/static/images/category-logo/category-2.jpg',
          text: '书籍',
        },
        {
          logo: '/static/images/category-logo/category-4.jpg',
          text: '全面屏手机',
        },
        {
          logo: '/static/images/category-logo/category-5.jpg',
          text: '空调',
        },
        {
          logo: '/static/images/category-logo/category-6.jpg',
          text: '游戏手机',
        },
      ],
      example: [
        {
          logo: '/static/images/category-logo/category-4.jpg',
          text: '示例',
        },
      ],
    };
  },
};
</script>

<style scoped>
.right {
  margin-left: 1rem;
  padding: 0 0 6rem;
}

.box {
  display: flex;
  flex-wrap: wrap;
}

.box .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
}
</style>