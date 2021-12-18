<template>
  <div class="bottom-bar">
    <div class="bottom-left flex">
      <div class="bottom-service flex">
        <i class="service icon"></i>
        <span>客服</span>
      </div>
      <div class="bottom-shop flex">
        <i class="shop icon"></i>
        <span>店铺</span>
      </div>
      <div class="bottom-collect flex">
        <i class="collect icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-right flex">
      <div class="bottom-cart flex" @click="addCart">
        <span>加入购物车</span>
      </div>
      <div class="bottom-buy flex">
        <span>购买</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailBottomBar",
    methods: {
      addCart(){
        this.$emit('addCartTo')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    position: relative;
    height: 49px;
    color: #413f3f;
  }
  .flex {
    flex: 1;
  }
  .icon {
    display: inline-block;
    background: url("~assets/img/detail/detail_bottom.png") no-repeat 0 0/100%;
    width: 22px;
    height: 22px;
    font-size: 0;
    margin-top: 6px;
  }
  .service {
    background-position: 0 -53px;
  }
  .shop {
    background-position: 0 -98px;
  }
  .collect {
    background-position: 0 0px;
  }
  .bottom-left {
    display: flex;
    text-align: center;
    font-size: 13px;
  }
  .bottom-left span {
    display: block;
  }
  .bottom-right {
    display: flex;
    text-align: center;
    line-height: 49px;
    font-size: 14px;
  }
  .bottom-cart {
    background-color: #f5de14;
  }
  .bottom-buy {
    background-color: #f76493;
  }
  .bottom-buy span {
    color: #ffffff;
  }
</style>
