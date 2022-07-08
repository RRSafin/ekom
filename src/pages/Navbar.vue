<template>
  <div class="navbar">
    <slot></slot>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>

.navbar {
  background-color: mediumpurple;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  padding: 0 15px;
  border: 1px solid dimgray;
  position: fixed;
}
</style>