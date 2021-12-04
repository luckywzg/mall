<template>
  <div class="shop-base-info">
    <div class="shop-name">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-num">
      <table class="shop-num-left">
        <tr>
          <td>{{(shop.sells/10000).toFixed(1)}}万</td>
          <td>{{shop.goodsCount}}</td>
        </tr>
        <tr>
          <td>总销量</td>
          <td>全部宝贝</td>
        </tr>
      </table>
      <span class="shop-num-center"></span>
      <table class="shop-num-right">
        <tr v-for="item in shop.score">
          <td class="shop-num-right-p">{{item.name}}</td>
          <td class="activeGreen shop-num-right-p" :class="{activeGreen: !item.isBetter,activeRed: item.isBetter}">{{item.score}}</td>
          <td :class="{activeGreenText: !item.isBetter, activeRedText: item.isBetter}">{{item.isBetter ? '高' : '低'}}</td>
        </tr>
      </table>
    </div>
    <a href="#" class="shop-come">进店逛逛</a>
  </div>
</template>

<script>
export default {
  name: "DetailShopBaseInfo",
  props: {
    shop: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  data(){
    return {
    }
  }
}
</script>

<style scoped>
  .shop-base-info {
    height: 180px;
    background-color: #fff;
  }
  .shop-name {
    position: relative;
    height: 70px;
  }
  .shop-name span{
    position: absolute;
    top: 30px;
    left: 58px;
    font-size: 15px;
  }
  .shop-name img{
    width: 40px;
    position: absolute;
    top: 20px;
    left: 10px;
    border-radius: 50%;
  }
  .shop-num {
    position: relative;
    width: 100%;
    height: 80px;
    text-align: center;
    font-size: 12px;
    padding-left: 10px;
    background-color: #fff;
  }
  .shop-num-left {
    float: left;
    margin: 20px 0 0 5px;
  }
  .shop-num-left td {
    padding: 0 8px;
  }
  .shop-num-center {
    position: absolute;
    width: 1px;
    height: 30px;
    top: 20px;
    left: 160px;
    background-color: #d0cfcf;
  }
  .shop-num-right {
    float: right;
    margin: 10px 30px 0 0;
  }
  .shop-num-right-p {
    padding: 0 5px;
  }
  .activeGreen {
    color: green;
  }
  .activeGreenText {
    background-color: green;
    color: #F6F6F6;
  }
  .activeRed {
    color: red;
  }
  .activeRedText {
    background-color: red;
    color: #F6F6F6;
  }
  .shop-come {
    display: inline-block;
    text-align: center;
    width: 150px;
    height: 30px;
    line-height: 30px;
    margin-left: 80px;
    background-color: #F3F5F9;
  }
</style>
