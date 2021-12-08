<template>
 <div class="detail-goods-info">
   <div class="detail-text">
     <div class="start"></div>
     <div class="detail-info">
       <span>{{detailInfo.key}}</span>
       <span>{{detailInfo.desc}}</span>
     </div>
     <span class="end-before"></span>

     <div class="end"></div>
   </div>
   <div class="detail-img" >
     <img :src="item" v-for="item in detailImage" @load="imgLoad" alt="">
   </div>
 </div>

</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default(){
        return {}
      }
    },
    detailImage: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
      imgCounter: 0,
      imgLength: 0
    }
  },
  methods: {
    imgLoad(){
      if(++this.imgCounter === this.imgLength){
        this.$emit('imgItemLoad')
      }
    }
  },
  watch: {
    detailInfo(){
      this.imgLength = this.detailImage.length
    }
  }
}
</script>

<style scoped>
  .detail-goods-info {
    position: relative;
  }
  .detail-text {
    margin-bottom: 10px;
  }
  .start {
    width: 80px;
    height: 1px;
    margin: 20px 0 0 10px;
    background-color: #918f8f;
  }
  .start::before {
    display: block;
    position: absolute;
    top: -5px;
    content: '';
    width: 5px;
    height: 5px;
    background-color: black;
  }
  .detail-info {
    margin-left: 10px;
    font-size: 14px;
    padding: 10px 5px;
  }
  .end {
    width: 80px;
    height: 1px;
    margin: 5px 0 0 220px;
    background-color: #918f8f;
  }
  .end-before {
    display: inline-block;
    position: absolute;
    right: 20px;
    width: 5px;
    height: 5px;
    background-color: black;
  }
  .detail-img img{
    width: 100%;
  }
</style>
