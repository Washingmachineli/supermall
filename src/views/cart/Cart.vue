<template>
  <div class="cart">
    <nav-bar class="cart-nav"><div slot="center">购物车({{cartLength}})</div></nav-bar>

    <scroll class="content" ref="scroll">

      <cart-list/>

    </scroll>

    <cart-bottom-bar />

  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";
  import CartList from "@/views/cart/childComps/CartList";
  import Scroll from "@/components/common/scroll/Scroll";
  import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    computed: {
      ...mapGetters(['cartLength'])
    },
    components: {
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>

  .cart {
    height: 100vh;
    position: relative;
  }

  .cart-nav{
    background-color: var(--color-tint);
    color: #fff;
  }


  .content{/*
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;*/

    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 89px;
  }
</style>
