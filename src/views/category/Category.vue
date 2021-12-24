<template>
  <div class="wrapper" ref="wrapper">
  <!--  使用better-scroll-->
    <h4>分类</h4>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    name: "Category",
    data(){
      return {
        scroll: null
      }
    },
    created() {
    //  不能使用created，此时的el还没有挂载
    },
    mounted() {
      console.log(document.querySelector('.wrapper'));
      this.scroll = new BScroll(document.querySelector('.wrapper'),{

      })
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: royalblue;
    overflow: hidden;
  }
</style>
