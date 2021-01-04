<template>
  <div class="category-detail">
    <div class="category-list">
      <category-content-item class="content-item"
                             v-for="(item, index) in subcategoryInfo.list"
                             :key="index"
                             :item-info="item"/>
    </div>
  </div>
</template>

<script>
  import CategoryContentItem from "@/views/category/ChildComps/CategoryContentItem";
  export default {
    name: "CategoryContent",
    props: {
      subcategoryInfo: {
        type: Object,
        default: {}
      }
    },
    components: {
      CategoryContentItem,
    },
  }
</script>

<style scoped>
  .category-detail {
    height: 100%;
    overflow: hidden;
  }
  .category-list {
    display: flex;
    flesx-direction: row;
    flex-wrap: wrap;
    padding: 15px 0;
  }

  .content-item {
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
