<template>
  <div class="goods-params">
    <table class="goods-sizes">
      <tr v-for="item in goodsParams.sizes">
        <td v-for="item1 in item">{{item1}}</td>
      </tr>
    </table>
    <div class="goods-table">
      <table class="goods-infos">
        <tr v-for="item in goodsParams.infos">
          <td>{{item.key}}</td>
          <td class="goods-infos-value">{{item.value}}</td>
        </tr>
      </table>
    </div>
    <div class="goods-img" v-if="goodsParams.imgage">
      <img :src="goodsParams.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsParams",
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .goods-sizes, .goods-infos {
    width: 90%;
    font-size: 14px;
    margin: 0 15px;
    border-collapse: collapse;
  }
  .goods-sizes {
    margin-bottom: 10px;
    border-bottom: 1px solid #e5e0e0;
  }
  .goods-sizes td, .goods-infos td {
    padding: 12px 5px;
    border-bottom: 1px solid #e5e0e0;
  }
  .goods-table {
    padding-bottom: 20px;
    border-bottom: 3px solid #e5e0e0;
  }
  .goods-infos-value {
    width: 250px;
    text-align: center;
    color: var(--color-high-text);
  }
  .goods-img {
    width: 100%;
  }
  .goods-img img {
    width: 100%;
  }
</style>
