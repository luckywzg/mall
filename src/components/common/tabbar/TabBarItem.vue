<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!--动态绑定点击颜色-->
    <div :style="isStyle" ><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      //设置默认颜色
      default: 'color:#ff5777'
    }
  },
  data(){
    return {
      // isActive: true
    }
  },
  computed: {
    isActive(){
      //在$route.path中找是否当前活跃状态的route和props中的path一致，一致则显示则返回true
      return this.$route.path.indexOf(this.path)!== -1
    },
    isStyle(){
      //当在isActive中判断为true时，即当前路由为活跃状态，需切换为活跃时的颜色，如果不处于活跃状态，则设置为空（黑色）
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      // console.log('itemClick')
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  /*绝大多数都是49px tab-bar*/
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  /*去除图片下边距*/
  vertical-align: middle;
}
</style>
