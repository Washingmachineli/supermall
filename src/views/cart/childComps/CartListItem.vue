<template>
  <div class="shop-item">
    <div class="item-selector">
      <check-box @click.native="checkClick" :is-checked="product.checked"></check-box>
    </div>
    <div class="item-img">
      <img  :src="product.image" alt="商品图片"/>
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">${{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckBox from "@/components/common/checkBox/CheckBox";
  import {CHANGE_CHECKED} from "@/store/mutations-types";

  export default {
    name: "CartListItem",
    props: {
      product: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        isChecked: false
      }
    },
    components: {
      CheckBox
    },
    methods: {
      checkClick() {
        this.$store.dispatch('changeCheck', this.product)
      }
    }
  }
</script>

<style scoped>

  .shop-item {
    display: flex;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-title, .item-desc {
    width: 31vh;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }

  .item-info {
    font-size: 17px;
    color: #333;
    padding: 6px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .info-bottom .item-price {
    color: orangered;
  }

</style>
