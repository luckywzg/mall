import {debounce} from "./utils";
export const imageListenerMixin = {
  data() {
    return {
      imageListener: null,
      //将防抖函数赋值给一个属性
      newRefresh: null
    }
  },
  mounted() {
    //1、赋值回调函数
    this.imageListener = () => {
      //3、使用防抖函数
      this.newRefresh()
    }
    //2、refresh接收返回过来的函数
    this.newRefresh = debounce(this.$refs.scroll.refresh, 500)
    this.$bus.$on('imgItemLoad', this.imageListener)
  }
}
