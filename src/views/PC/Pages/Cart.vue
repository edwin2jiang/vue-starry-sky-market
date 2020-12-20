<template>
  <div>
    <header-part />
    <search-simple />
    <my-cart />
    <my-footer />
  </div>
</template>
 
<script>
import MyFooter from 'PC/footer/MyFooter.vue';
import HeaderPart from 'PC/header/HeaderPart.vue';
import SearchSimple from 'PC/search/SearchSimple.vue';
import MyCart from 'PC/cart/myCart.vue';

export default {
  components: { HeaderPart, MyFooter, SearchSimple, MyCart },
  name: 'Cart',
};
</script>

<style scoped>
</style>