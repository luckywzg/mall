<template>
  <div class="cart-list">
    <!--<div v-for="item in cartList">{{item}}</div>-->
    <CartListItem v-for="(item, index) in cartList"
                  :key="index"
                  :product="item"/>
  </div>
</template>

<script>
  import CartListItem from "./CartListItem";
  import { mapGetters } from 'vuex'
  export default {
    name: "CartList",
    components: {
      CartListItem
    },
    computed: {
      ...mapGetters([
        'cartList'
      ])
    }
  }
</script>

<style scoped>

</style>
