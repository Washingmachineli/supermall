<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-box class="check-all" :is-checked="isCheckAll" @click.native="checkAll"/>
      <span>全选</span>
    </div>
    <div class="total">合计：{{cartTotal}}</div>
    <div class="pay" @click="calClick">
      <span>去结算({{checkLength}})</span>
    </div>
  </div>
</template>

<script>
  import CheckBox from "@/components/common/checkBox/CheckBox";

  import { mapGetters } from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {
      CheckBox
    },
    data(){
      return {
        isCheck: true
      }
    },
    computed: {
      ...mapGetters(['checkLength', 'cartTotal', 'isCheckAll']),
    },
    methods: {
      checkAll() {
        this.$store.dispatch('changeCheckAll', !this.isCheckAll)
      },
      calClick() {
        if(!this.checkLength) {
          this.$toast.show('请先选择商品!', 3000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: absolute;
    display: flex;
    left: 0;
    right: 0;
    bottom: 49px;
    background-color: #eee;
  }

  .bottom-bar>div {
    display: flex;
    align-items: center;
  }

  .check-content {
    padding: 0 5px;
  }

  .check-all {
    width: 20px;
    height: 20px;
  }

  .total {
    padding: 0 5px;
  }

  .pay {
    position: absolute;
    right: 0px;
    padding: 0px 10px;
    line-height: 40px;
    align-items: center;
    background-color: red;
    color: white;
  }

</style>
