<template>
  <div id="detail">
    <detail-nav-bar />
    <scroll class="content" ref="scroll">
      <detail-swiper :image-top="imageTop" />
      <detail-base-info :goods="goods" />
      <detail-shop-base-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" :detail-image="detailImage"
                         @imgItemLoad="imgItemLoad"/>
    </scroll>
  </div>

</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopBaseInfo from "./childComps/DetailShopBaseInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";

  import Scroll from "../../components/common/scroll/Scroll";
  import {debounce} from "common/utils";
  import {getImageTop,Goods,Shop} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopBaseInfo,
      DetailGoodsInfo,
      Scroll
    },
    data(){
      return {
        iid: null,
        imageTop: [],
        goods: {},
        shop: {},
        detailInfo: {},
        detailImage: []
      }
    },
    created() {
      //1、保存iid
      this.iid = this.$route.params.iid
      getImageTop(this.iid).then(res => {
        console.log(res);
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
        console.log(this.detailInfo);
      })
    },
    //出现了使用better-scroll无法滚动，是图片加载带来的问题，重新刷新一下
    methods: {
      imgItemLoad(){
        this.$refs.scroll.refresh()
      }
    }
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
