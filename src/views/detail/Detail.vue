<template>
  <div id="detail">
    <!--接收从导航发射过来的事件-->
    <detail-nav-bar @titleClick="titleClick" ref="detailNav" />
    <!--接收从scroll中发射的scroll事件，
    并且传递probeType值（需要动态监听否则可能会是字符串），否则默认不监听滚动-->
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :image-top="imageTop" />
      <detail-base-info :goods="goods" />
      <detail-shop-base-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" :detail-image="detailImage"
                         @imgItemLoad="imgItemLoad"/>
      <detail-goods-params ref="params" :goods-params="goodsParams" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCartTo="addCartTo"/>
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
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getImageTop,getRecommend,Goods,Shop,Comment} from "network/detail";
  import {GoodsParams} from "network/detail";
  import {debounce} from "common/utils";
  import {imageListenerMixin} from "common/mixin";
  import {BackTopMain} from "../../common/mixin";
  import { mapActions } from "vuex"
  export default {
    name: "Detail",
    components: {
      BackTop,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopBaseInfo,
      DetailGoodsInfo,
      DetailGoodsParams,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
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
        recommend: [],
        //导航点击跳转对应内容保存的可视高度offsetTop数组
        titleTopYs: [],
        getTitleTopYs: null,
        currentIndex: 0,
      }
    },
    mixins: [imageListenerMixin, BackTopMain],
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
        //在这里获取正确的offsetTop
        //对要获取数据的函数进行一层防抖包装
        this.getTitleTopYs = debounce( () => {
          this.titleTopYs = []
          this.titleTopYs.push(0)
          this.titleTopYs.push(this.$refs.params.$el.offsetTop);
          this.titleTopYs.push(this.$refs.comment.$el.offsetTop)
          this.titleTopYs.push(this.$refs.recommend.$el.offsetTop)
          this.titleTopYs.push(Number.MAX_VALUE)
        }, 200)
        this.getTitleTopYs()
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, (-this.titleTopYs[index] + 44), 200)
      },
      contentScroll(position){
        const positionY = (-position.y) + 44
        //将获取到的y值和标题的可视区域进行判断
        //[0, 5610, 6434, 6746]
        //当y值大于等于0且小于5610时，index值为0
        //当y值大于等于5610且小于6434时，index值为1
        //当y值大于等于6434且小于6746时，index值为2
        //当y值大于等于6746时，index值为3

        //普通做法：
        // let length = this.titleTopYs.length
        // for(let i in this.titleTopYs){
        //   //不做转换会是字符串类型
        //   i = i * 1
        //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.titleTopYs[i] && positionY < this.titleTopYs[i+1]) || (i === length -1 && positionY >= this.titleTopYs[i]))) {
        //     console.log(i);
        //     console.log(typeof i);
        //     this.currentIndex = i
        //     this.$refs.detailNav.currentIndex = this.currentIndex
        //   }
        // }

        //hack做法：往this.titleTopY数组中追加一个非常大的值，这样就能俩俩判断
        //[0, 5610, 6434, 6746] => [0, 5610, 6434, 6746, Number.MAX_VALUE]
        for(let i in this.titleTopYs) {
          i = i * 1
          if(this.currentIndex !== i && positionY >= this.titleTopYs[i] && positionY < this.titleTopYs[i+1]) {
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
        //回到顶部
        this.BackTopContentScroll(position)
      },
      ...mapActions(["addCart"]),
      addCartTo() {
        let product = {}
        product.iid = this.iid
        product.image = this.imageTop[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.lowNowPrice
        //将商品信息添加到购物车使用commit
        this.addCart(product).then(res => {
          this.$toast.show(res, 1500)
        })
        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
        // console.log(res);
        // this.message = res
        // this.isShow = true
        // setTimeout(() => {
        //   this.message = ''
        //   this.isShow = false
        // },2000)
        // console.log(this.$toast);
        // console.log(this.$toast.methods.show);
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
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
