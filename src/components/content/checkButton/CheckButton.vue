<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" :class="{checked: isChecked}" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .check-button {
    display: flex;
    text-align: center;
    align-items: center;
    padding: 0 5px;
  }
  .check-button img {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid #ccc;
  }
  .check-button .checked {
    background-color: red;
    border-color: red;
  }
</style>
