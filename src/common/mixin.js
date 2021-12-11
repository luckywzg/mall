import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";
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
export const BackTopMain = {
  data() {
    return {
      isShowBackTop: false,
      offsetTop: 0,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    BackTopContentScroll(position){
      this.isShowBackTop = (-position.y) > 1000
      this.isShowTabControl = (-position.y) > this.offsetTop
    },
  }
}
