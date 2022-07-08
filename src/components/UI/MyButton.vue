<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton'
}
</script>

<style scoped>
.btn {
  border-radius: 10px;
  padding: 10px 15px;
  background: #ffffff;
  color: royalblue;
  border: 1px solid dodgerblue;
  cursor: pointer;
  margin: 15px;
}
</style>