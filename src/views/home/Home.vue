<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="first-tab-control"
                 v-show="isTabFixed"/>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <re-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import ReView from "@/views/home/childComps/ReView";
import FeatureView from "@/views/home/childComps/FeatureView";
import Scroll from "@/components/common/scroll/Scroll";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import BackTop from "@/components/content/backTop/BackTop";
import GoodsList from "@/components/content/goods/GoodsList";


import {getHomeMultidata, getHomeGoods} from "network/home";
import {itemListenerMixin, showBackTop} from "@/common/mixin";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    ReView,
    FeatureView,
    Scroll,

    NavBar,
    TabControl,
    BackTop,
    GoodsList,
  },
  mixins: [itemListenerMixin, showBackTop],
  data(){
    return{
      banners: [],
      recommends: [],
      titles: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //请求多个数据
    this.getHomeMultidata()

    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()

    //取消事件总线监听
    this.$bus.$off('itemImgLoad', this.tabOffsetTop)
  },
  methods: {
    /**
     * 事件监听
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break
        case 1:
          this.currentType = 'new';
          break
        case 2:
          this.currentType = 'sell';
          break
      }
      this.$refs.scroll.scrollTo(0, -this.tabOffsetTop);
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },
    contentScroll(position){
      //判断是否显示backTop
      this.isShowBackTop = (-position.y) > 1000

      //判断tabControl是否要有吸顶效果
      this.isTabFixed = (-position.y) > this.tabOffsetTop

    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求
     */
    getHomeMultidata(){
      getHomeMultidata().then( res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        }
      )
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      })

    },

  }
}
</script>

<style scoped>
#home{
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav{
  background-color: var(--color-tint);
  color: #fff;

  /*position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;*/
}


.content{/*
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;*/

  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
}

.first-tab-control{
  position: relative;
  z-index: 9;
}

</style>
