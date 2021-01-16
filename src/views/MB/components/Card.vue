<template>
  <div class="card">
    <div v-if="hasTitle || 'false'" class="title">
      <span class="title">
        {{ title }}
      </span>
      <span class="rightText"> {{ rightText }} > </span>
    </div>
    <van-divider />
    <slot name="content" />
  </div>
</template>
 
<script>
export default {
  name: 'MyCard',
  props: ['title', 'rightText', 'hasTitle'],
};
</script>

<style scoped>
.card {
  margin: 1rem auto;
  padding: 1rem;
  width: 90%;
  border-radius: 1rem;
  background: #fff;
}

.card .title {
  display: flex;
  font-weight: 600;
  justify-content: space-between;
}

.card .title .rightText {
  color: #ddd;
}
</style>