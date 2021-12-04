<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "Scroll",
    data(){
      return {
        scroll: null,
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper,{
        //默认值为false，scroll中的button可以正常监听点击
        //但是div等不能被监听点击，必须设置为true时，才能监听点击
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // console.log(this.scroll);
      //严谨写法判断是否要监听滚动
      if(this.probeType === 2 || this.probeType ===3) {
        this.scroll.on('scroll', position => {
          this.$emit('scroll',position)
        })
      }
      //严谨写法判断是否要监听上拉记载更多
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp',() => {
          // console.log('上拉加载更多');
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      //1、监听滚动事件
      scrollTo(x,y,time = 300){
        //判断当前的this.scroll是否创建，最好添加一个判断
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      //2、刷新scrollHeight
      refresh() {
        console.log('----11-');
        this.scroll && this.scroll.refresh()
      },
      //3、上拉加载更多
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      //4、记录当前滚动位置
      getSaveY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
