<template>
  <span> </span>
</template>
 
<script>
export default {
  name: 'MyTag',
  props:['text','type']
};
</script>

<style scoped>
.tag {
  height: 24px;
  padding: 0 8px;
  margin: 0 2px;
  line-height: 22px;
  background-color: #ecf5ff;
  border-color: #d9ecff;
  display: inline-block;
  font-size: 12px;
  color: #409eff;
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
}

.tag-info {
  background-color: #fff;
  border-color: #d3d4d6;
  color: #909399;
}

.tag.active {
  background-color: #fff;
  border-color: #b3d8ff;
  color: #409eff;
}
</style>