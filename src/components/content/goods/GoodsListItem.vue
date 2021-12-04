<template>
  <div class="goods-item" @click="goodsItemClick">
    <img :src="goodsItem.show.img" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    imgLoad(){
      // console.log('imgLoad');
      //使用全局总线
      this.$bus.$emit('imgItemLoad')
    },
    goodsItemClick(){
      // console.log('---');

      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
  .goods-item {
    width: 48%;
  }
  .goods-item img {
    width: 100%;
    height: 80%;
    border-radius: 5px;
  }
  .goods-info {
    /*text-align: center;*/
    position: relative;
    overflow: hidden;
    height: 50px;
    font-size: 14px;
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
    padding-left: 5px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    position: absolute;
    left: 25px;
  }
  .goods-info .collect {
    position: absolute;
    left: 95px;
  }
  .goods-info  .price::before{
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    left: 55px;
    padding: 0 3px;
    background: url("~assets/img/common/collect.svg") no-repeat 0 0/14px 14px;
  }
</style>
