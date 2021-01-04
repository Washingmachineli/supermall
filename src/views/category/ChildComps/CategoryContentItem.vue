<template>
  <div class="item-content">
    <a class="item" :href="itemInfo.link">
      <img :src="itemInfo.image" @load="categotyImageLoad">
      <p class="item-title">{{itemInfo.title}}</p>
    </a>
  </div>
</template>

<script>
  export default {
    name: "CategoryContentItem",
    props: {
      itemInfo: {
        type: Object,
        default: {}
      }
    },
    methods: {
      categotyImageLoad(){
        this.$bus.$emit('categoryImageLoad')
      }
    }
  }
</script>

<style scoped>
  .item img {
    width: 60px;
  }

  .item-content {
    text-align: center;
    padding: 5px 2px;
  }
</style>
