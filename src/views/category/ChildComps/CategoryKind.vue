<template>
  <div>
    <div class="out">
      <div class="menu"
           v-for="(item, index) in categoryMenu.list"
           :key="index"
           @click="menuClick(index)"
           :class="{isSelected: index === currentIndex ? true : false }">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CategoryKind",
    props: {
      categoryMenu: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      menuClick(index) {
        this.currentIndex = index;
        const data = {
          'maitKey': this.categoryMenu.list[index].maitKey,
          'miniWallkey': this.categoryMenu.list[index].miniWallkey
        }
        this.$emit('menuClick', data)
      }
    }
  }
</script>

<style scoped>
  .menu {
    line-height: 40px;
    background-color: #f6f6f6;
    text-align: center;
    width: 100px;
  }

  .out {
    background-color: #f6f6f6;
  }

  .isSelected {
    padding-top: 3px;
    padding-left: 3px;
    background-clip:content-box;
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
