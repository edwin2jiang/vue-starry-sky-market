<template>
  <div class="seckill-item__price">
    <span class="price-miaosha"
      ><span>¥</span><span>{{ newValue }}</span>
    </span>
    <span class="price-origin"
      ><span>¥</span><span>{{ oldValue }}</span></span
    >
  </div>
</template>
 
<script>
export default {
  name: 'Value',
  props: ['oldValue', 'newValue'],
};
</script>

<style scoped>
.seckill-item__price {
  border: 1px solid #e1251b;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 24px;
  overflow: hidden;
  background-color: #e1251b;
}

.seckill-item__price {
  width: 160px;
  height: 24px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 7px;
}

.seckill-item__price .price-miaosha {
  width: 92px;
  height: 100%;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  float: left;
}

.seckill-item__price .price-miaosha:before {
  content: ' ';
  width: 0;
  height: 0;
  border-color: transparent white transparent transparent;
  border-style: solid;
  border-width: 22px 8px 0 0;
  position: absolute;
  top: 0;
  left: 84px;
}

.seckill-item__price .price-origin {
  height: 100%;
  width: 66px;
  float: right;
  background: #fff;
  text-align: center;
  color: #999;
  font-size: 12px;
  line-height: 22px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-decoration: line-through;
  vertical-align: top;
}
</style>