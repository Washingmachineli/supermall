<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"
                    @titleClick="titleClick"
                    ref="navbar"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper class="detail-swiper" :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info ref="params" :params-info="paramsInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="goodsCommend"/>
    </scroll>
    <back-top class="back-top" @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @cartClick="cartClick"/>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
  import Scroll from "@/components/common/scroll/Scroll";
  import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
  import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
  import DetailParamsInfo from "@/views/detail/childComps/DetailParamsInfo";
  import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
  import GoodsList from "@/components/content/goods/GoodsList";
  import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "@/network/detail";
  import {itemListenerMixin, showBackTop} from "@/common/mixin";
  import {debounce} from "@/common/utils";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      GoodsList,
      Scroll,
      DetailBottomBar,
    },
    mixins: [itemListenerMixin, showBackTop],
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        goodsCommend: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      }
    },
    created() {
      //保存iid
      this.iid = this.$route.params.iid

      //请求数据
      getDetail(this.iid).then(res => {
        /*console.log(res);*/

        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo);
        this.detailInfo = data.detailInfo;
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)


        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
          /*console.log(this.commentInfo)*/
        }

      })

      //请求推荐数据
      getRecommend().then(res => {
        this.goodsCommend = res.data.list;
        /*console.log(this.goodsCommend);*/
      })

      //获取跳转y值,防抖提高性能
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(this.$refs.scroll.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44)
        this.themeTopYs.push(Number.MAX_VALUE)
      },100)
    },
    methods: {
      imageLoad(){
        this.$refs.scroll.refresh();

        this.getThemeTopY()

      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300)
      },
      contentScroll(position){
        //返回顶部按钮
        this.isShowBackTop = (-position.y) > 1000

        //顶部导航栏变色
        const y = -position.y;
        const length = this.themeTopYs.length;
        for (let i = 0; i < length-1; i++) {
          if(this.currentIndex !== i && (y >= this.themeTopYs[i] && y < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.navbar.currentIndex = i;
          }
        }
      },
      cartClick(){
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        this.$store.dispatch('addCart', product).then(res => {
          console.log(res)
          this.$toast.show(res, 3000)
        })
      }
    },
    destroyed() {
      this.$bus.$off('itemImgLoad', this.itemImgListener)
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

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .back-top{
    width: 30px;
    height: 30px;
    right: 20px;
    bottom: 80px;
  }



</style>
