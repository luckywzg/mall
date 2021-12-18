<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>
    <scroll class="content">
      <cart-list />
    </scroll>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import CartList from "./childComps/CartList";

  import {mapGetters} from "vuex"
  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,
      CartList
    },
    computed: {
      //不直接定义methods方法，使用vuex中的getters，先导入
      //两种写法，第一种
      ...mapGetters([
        "cartListLength"
      ]),
      //第二种，可以改名
      // ...mapGetters({
      //   length: "cartListLength"
      // })
    },
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .cart-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
