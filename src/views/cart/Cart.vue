<template>
  <div class="cart">
    <nav-bar class="cart-nav">
      <div slot="center">购物车({{cartListLength}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list />
    </scroll>
    <check-button-bar @isSelectAllFalse="isSelectAllFalse"
                      @isSelectAllTrue="isSelectAllTrue"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "components/common/scroll/Scroll";
  import CartList from "./childComps/CartList";
  import CheckButtonBar from "./childComps/CheckButtonBar";

  import {mapGetters} from "vuex"
  import {IS_SELECT_ALL_FALSE, IS_SELECT_ALL_TRUE} from "../../store/mutations_types";
  export default {
    name: "Cart",
    components: {
      NavBar,
      Scroll,
      CartList,
      CheckButtonBar
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
    activated() {
      this.$refs.scroll.refresh()
    },
    methods: {
      isSelectAllFalse() {
        this.$store.commit(IS_SELECT_ALL_FALSE)
      },
      isSelectAllTrue() {
        this.$store.commit(IS_SELECT_ALL_TRUE)
      }
    }
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
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>
