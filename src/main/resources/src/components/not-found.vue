<template>
  <div class="not-found-container">
    <h1>404 Page!!!</h1>
    <div>
      <router-link to="/home" replace>Go Home page</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound"
};
</script>

<style lang="less" scoped>
.not-found-container {
  width: 100%;
  height: 100%;
  text-align: center;

  h1 {
    height: 50px;
    line-height: 50px;
    color: #000;
    font-weight: 900;
  }
}
</style>
