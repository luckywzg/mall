<template>
  <div>
    <div>{{product}}</div>
    <div class="cart-list">
      <select></select>
      <img :src="product.image" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartListItem",
    props: {
      product: {
        type: Object,
        default(){
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .cart-list {
    width: 100%;
    background-color: royalblue;
  }
  .cart-list img {
    width: 30%;
    border-radius: 10px;
  }
</style>
