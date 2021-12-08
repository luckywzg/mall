<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 class="tab-control"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isShowTabControl"
                 :class="{tabControlFixed: isShowTabControl}"></tab-control>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @homeSwiperImg="homeSwiperImg"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']"
                   class="tab-control"
                   @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";


  import {getHomeMultidata,getGoodsData} from "network/home";
  import {imageListenerMixin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      NavBar,
      GoodsList,
      TabControl,
      Scroll,
      BackTop,
      HomeSwiper,
      RecommendView,
      FeatureView,
    },
    data(){
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {
            page: 0,
            list: []
          },
          'new': {
            page: 0,
            list: []
          },
          'sell': {
            page: 0,
            list: []
          }
        },
        currentType: 'pop',
        isShowBackTop: false,
        offsetTop: 0,
        isShowTabControl: false,
        saveY: 0
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getHomeMultidata()
      this.getGoodsData('pop')
      this.getGoodsData('new')
      this.getGoodsData('sell')
    },
    mixins: [imageListenerMixin],
    mounted() {
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getSaveY()
      this.$bus.$off('imgItemLoad', this.imageListener)
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    methods: {
      /**
      * 监听点击
      */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
        this.$refs.scroll.scrollTo(0, 0)
      },
      contentScroll(position){
        this.isShowBackTop = (-position.y) > 1000
        this.isShowTabControl = (-position.y) > this.offsetTop
      },
      loadMore(){
        //当前处于的类型再次请求数据
        this.getGoodsData(this.currentType)
      },
      homeSwiperImg(){
        //监听图片是否加载完
        this.offsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
      * 网络请求
      */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list
          this.recommends = res.data.data.recommend.list
        })
      },
      getGoodsData(type){
        const page = this.goods[type].page + 1
        getGoodsData(type,page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
          //结束当前一次上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*position: relative;*/
    /*padding-top: 44px;*/
    /*可视高度*/
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*采用了better-scroll滚动后，不会随滚动移动*/
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }
  .tabControlFixed {
    position: relative;
    z-index: 9;
  }
  .content {
    /*方法一：*/
    /*height: 300px;*/
    /*方法二：*/
    /*height: calc(100% - 49px);*/
    overflow: hidden;
    /*方法三：*/
    position: absolute;
    top: 45px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
