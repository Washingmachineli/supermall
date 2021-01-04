import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backTop/BackTop";

export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null,
    }
  },
  mounted() {

    const refresh = debounce(this.$refs.scroll.refresh)

    //保存事件总线监听事件
    this.itemImgListener = () => {
      refresh()
    }
    //监听item中图片加载完成
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const showBackTop = {
  data(){
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0, 0);
      //this.$refs.scroll.$data.scroll.scrollTo(0)
    }
  }

}
