<template>
  <div>
    <header-part />
    <search-simple />
    <search-res />
    <my-footer />
  </div>
</template>
 
<script>
import MyFooter from '../footer/MyFooter.vue';
import HeaderPart from '../header/HeaderPart.vue';
import SearchSimple from '../search/SearchSimple.vue';
import SearchRes from '../searchResults/SearchRes.vue';
export default {
  components: { SearchSimple, HeaderPart, MyFooter, SearchRes },
  name: 'SearchResult',
};
</script>

<style scoped>
</style>