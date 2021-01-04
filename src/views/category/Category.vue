<template>
  <div class="category">
    <nav-bar class="category-nav"><div slot="center">分类</div></nav-bar>
    <tab-control :titles="titles"
                 :class="{tabTop: isTabTop}"
                 v-show="isTabTop"
                 @tabClick="tabClick"
                 ref="tabControl1"/>
      <div class="category-content">
        <scroll class="content1 menu-bg" ref="scroll1">
          <div>
            <category-kind :category-menu="menuInfo" @menuClick="menuClick"/>
          </div>
        </scroll>
        <scroll class="content2"
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll">
          <div>
            <category-content :subcategory-info="subcategoryInfo"/>
            <tab-control :titles="titles"
                         @tabClick="tabClick"
                         ref="tabControl2"/>
            <goods-list :goods="showGoods"/>
          </div>
        </scroll>
      </div>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import Scroll from "@/components/common/scroll/Scroll";
  import NavBar from "@/components/common/navbar/NavBar";
  import CategoryKind from "@/views/category/ChildComps/CategoryKind";
  import CategoryContent from "@/views/category/ChildComps/CategoryContent";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";

  import {getCategoryMenu, getSubcategory, getCategoryDetail} from "@/network/category";
  import {debounce} from "@/common/utils";
  import {itemListenerMixin, showBackTop} from "@/common/mixin";

  export default {
    name: "Category",
    components: {
      Scroll,
      NavBar,
      CategoryKind,
      CategoryContent,
      TabControl,
      GoodsList
    },
    mixins: [itemListenerMixin, showBackTop],
    data() {
      return {
        menuInfo: {},
        maitKey: '',
        miniWallkey: '',
        subcategoryInfo: {},
        titles: ['综合', '新品', '销量'],
        goods: {
          'pop': [],
          'new': [],
          'sell': []
        },
        currentType: 'pop',
        tabControlHeight: 1000,
        tabControlHeightListener: null,
        isTabTop: false,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType]
      }
    },
    created() {
      this._getCategoryMenu()
    },
    mounted() {

      const getHeightRefresh = debounce(() => {
        this.$refs.scroll.refresh
        this.tabControlHeight = this.$refs.tabControl2.$el.offsetTop;
      },500)
      this.tabControlHeightListener = () => {
        getHeightRefresh()
      }

      this.$bus.$on('categoryImageLoad', this.tabControlHeightListener)
    },
    methods: {
      async _getCategoryMenu() {
        await getCategoryMenu().then( res => {
          this.menuInfo = res.data.category
          this.maitKey = res.data.category.list[0].maitKey
          this.miniWallkey = res.data.category.list[0].miniWallkey
          this._getSubcategory()
          this._getCategoryDetail('pop')
          this._getCategoryDetail('new')
          this._getCategoryDetail('sell')
          //this._getCategoryDetail('new')
          //this._getCategoryDetail('sell')
        })
      },
      async _getSubcategory() {
        await getSubcategory(this.maitKey).then( res => {
          this.subcategoryInfo = res.data
        })
      },
      async _getCategoryDetail(type) {
        await getCategoryDetail(this.miniWallkey, type).then( res => {
          this.goods[type].push(...res)
          this.goods[type].forEach( item => {
            item.image = item.img
          })
        })
      },
      tabClick(index){
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

        this.$refs.scroll.scrollTo(0, -this.tabControlHeight);
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      menuClick(data){
        this.maitKey = data.maitKey
        this.miniWallkey = data.miniWallkey
        this.goods = {
          'pop': [],
          'new': [],
          'sell': []
        }
        this.$refs.tabControl1.backFirst()
        this.$refs.tabControl2.backFirst()
        this._getSubcategory()
        this._getCategoryDetail('pop')
        this._getCategoryDetail('new')
        this._getCategoryDetail('sell')
      },
      contentScroll(position) {
        this.isShowBackTop = -position.y >= 2000
        this.isTabTop = -position.y >= this.tabControlHeight
      },
    },
  }
</script>

<style scoped>
  .category{
    height: 100vh;
    position: relative;
  }

  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content1 {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  .content2 {
    overflow: hidden;
    position: absolute;
    top: 44px;
    left: 100px;
    bottom: 49px;
   }

  .category-content {
    display: flex;
  }

  .tabTop {
    position: absolute;
    top: 44px;
    left: 100px;
    right: 0;
    background-color: #fff;
    z-index: 9;
  }

  .menu-bg {
    background-color: #f6f6f6;
  }
</style>
