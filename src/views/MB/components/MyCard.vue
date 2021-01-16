<template>
  <div class="card">
    <slot name="content" />
  </div>
</template>
 
<script>
export default {
  name: 'MyCard',
  props: ['title', 'rightText'],
};
</script>

<style scoped>
.card {
  width: 100%;
  border-radius: 0.4rem;
  background: #fff;
}
</style>