<template>
  <nav-bar>
    <div slot="left" class="left">
      <img src="~assets/img/common/back.svg" alt="" @click="imgClick">
    </div>
    <div class="detail-nav" slot="center">
      <div class="detail-item"
           v-for="(item, index) in titles"
           :class="{active: currentIndex === index}"
           @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data(){
      return {
        titles: ['商品','参数','评论','详情'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        //发射事件
        this.$emit('titleClick', index)
      },
      imgClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .detail-nav {
    display: flex;
  }
  .detail-item {
    flex: 1;
    font-size: 14px;
  }
  .active {
    color: var(--color-high-text);
  }
  .left {
    margin-top: 5px;
  }
</style>
