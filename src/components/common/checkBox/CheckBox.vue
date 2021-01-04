<template>
  <div>
    <img class="check" :class="{isChecked: isChecked}" src="~assets/img/cart/tick.svg">
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .check {
    border-radius: 50%;
    border: 1px solid var(--color-text);
  }

  .isChecked {
    background-color: red;
    border: 1px solid red;
  }

</style>
