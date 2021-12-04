<template>
 <div class="detail-base-info" v-if="Object.keys(goods).length !== 0">
   <div class="detail-title">{{goods.title}}</div>
   <div class="detail-price">
     <span class="detail-low-price">￥{{goods.lowNowPrice}}</span>
     <span class="detail-old-price">{{goods.oldPrice}}</span>
     <span v-if="goods.discountDesc" class="detail-discount">{{goods.discountDesc}}</span>
   </div>
   <div class="detail-info">
     <span>{{goods.services[0]}}</span>
     <span>{{goods.services[1]}}</span>
     <span>{{goods.columns[0].name}}</span>
   </div>
   <div class="detail-base">
     <div v-for="index in goods.columns.length - (goods.columns.length - 2) " :key="index">
       <img :src="goods.columns[index].icon" alt=""
            class="detail-base-img">
       <span>{{goods.columns[index].name}}</span>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .detail-base-info {
    border-bottom: 3px solid #F6F6F6;
  }
  .detail-title {
    margin: 10px 0 10px 8px;
  }
  .detail-price {
    margin: 0 0 10px 8px;
  }
  .detail-low-price {
    color: var(--color-high-text);
    font-size: 18px;
    font-weight: 700;
  }
  .detail-old-price {
    color: #8a898a;
    margin: 0 10px;
    font-size: 12px;
    text-decoration: line-through;
  }
  .detail-discount {
    background-color: var(--color-tint);
    color: #fff;
    padding: 2px 5px;
    font-size: 13px;
    border-radius: 10px;
  }
  .detail-info {
    position: relative;
    padding-left: 8px;
    font-size: 14px;
    color: #8a898a;
    padding-bottom: 10px;
    border-bottom: #F6F6F6 solid 2px;
  }
  .detail-info span:nth-child(2) {
    position: absolute;
    left: 120px;
  }
  .detail-info span:last-child {
    float: right;
    margin-right: 10px;
  }
  .detail-base {
    font-size: 14px;
    margin: 10px 0 20px 8px;
  }
  .detail-base div {
    display: inline;
  }
  .detail-base div:last-child {
    float: right;
    padding-right: 10px;
  }
  .detail-base-img {
    width: 14px;
  }
</style>
