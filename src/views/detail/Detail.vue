<template>
  <div id="detail">
    <detail-nav-bar />
    <scroll class="content" ref="scroll">
      <detail-swiper :image-top="imageTop" />
      <detail-base-info :goods="goods" />
      <detail-shop-base-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" :detail-image="detailImage"
                         @imgItemLoad="imgItemLoad"/>
      <detail-goods-params :goods-params="goodsParams" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommend" />
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopBaseInfo from "./childComps/DetailShopBaseInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailGoodsParams from "./childComps/DetailGoodsParams";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getImageTop,getRecommend,Goods,Shop,Comment} from "network/detail";
  import {GoodsParams} from "network/detail";
  import {imageListenerMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopBaseInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      Scroll,
      GoodsList
    },
    data(){
      return {
        iid: null,
        imageTop: [],
        goods: {},
        shop: {},
        detailInfo: {},
        detailImage: [],
        goodsParams: {},
        commentInfo: {},
        recommend: []
      }
    },
    mixins: [imageListenerMixin],
    mounted() {
    },
    destroyed() {
      this.$bus.$off('imgItemLoad', this.imageListener)
    },
    created() {
      //1、保存iid
      this.iid = this.$route.params.iid
      //2、请求详情数据
      getImageTop(this.iid).then(res => {
        const data = res.data.result
          //2、获取轮播图片
        this.imageTop = res.data.result.itemInfo.topImages
        //3、获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //4、获取商家信息
        this.shop = new Shop(data.shopInfo)
        //5、获取图片详情
        this.detailInfo = data.detailInfo
        this.detailImage = data.detailInfo.detailImage[0].list
        //6、获取参数信息
        this.goodsParams = new GoodsParams(data.itemParams.info, data.itemParams.rule)
        //7、获取评论信息
        this.commentInfo = new Comment(data.rate)
      })
      //3、请求详情推荐数据
      getRecommend(this.iid).then(res => {
        this.recommend = res.data.data.list
      })
    },
    //出现了使用better-scroll无法滚动，是图片加载带来的问题，重新刷新一下，并使用防抖
    //封装在mixin.js中
    methods: {
      imgItemLoad(){
        this.newRefresh()
      }
    },
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>
