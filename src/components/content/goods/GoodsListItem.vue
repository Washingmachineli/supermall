<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return []
        }
      }
    },
    computed: {
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      },
      showIid(){
        return this.goodsItem.iid || this.goodsItem.shop_id
      }
    },
    methods: {
      imageLoad(){
        //1.home和detail监听，在跳转到其他页面得时候取消监听
        this.$bus.$emit('itemImageLoad')

        //2.另一种方法
        /*if(this.$route.path.indexOf('/home') !== -1)
        {
          this.$bus.$emit('homeItemImageLoad')
        }
        else if(this.$route.path.indexOf('/detail') !== -1) {
          this.$bus.$emit('detailItemImageLoad')
        }*/
      },
      itemClick(){
        if(this.$route.path.indexOf('/detail') === -1)
        {
          this.$router.push('/detail/' + this.showIid)
        }
        else{
          window.location.href = this.goodsItem.item_url
        }
      }
    }
  }
</script>

<style scoped>
  .goods-item{
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }

  .goods-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
