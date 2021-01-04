<template>
  <div v-if="Object.keys(goods).length !== 0" >
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[0].name}}</span>
    </div>
    <div class="info-services">
      <span v-for="item in goods.services.length-1">
        <img :src="goods.services[item].icon"/>
        <span>{{goods.services[item].name}}</span>
      </span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default: {}
      }
    }
  }
</script>

<style scoped>
  .info-title {
    color: black;
    font-size: 16px;
    margin-left: 5px;
    margin-top: 10px;
    padding-bottom: 10px;
  }

  .info-price {
    margin-left: 5px;
    padding-bottom: 5px;
  }

  .info-price .new-price {
    font-size: 20px;
    color: var(--color-high-text);
  }

  .info-price .old-price {
    text-decoration: line-through;
    font-size: var(--font-size);
    color: var(--color-text);
    margin-left: 5px;
  }

  .info-price .discount {
    color: #fff;
    margin-left: 5px;
    padding: 2px 2px 2px 2px;
    background-color: var(--color-high-text);
    font-size: 5px;
    border-radius: 8px;
  }

  .info-other {
    padding: 10px 5px;
    display: flex;
    font-size: 13px;
    justify-content: space-between;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-services {
    padding: 20px 5px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    border-bottom: 3px solid rgba(100,100,100,.05);
  }

  .info-services span img{
    width: 12px;
    height: 12px;
  }
</style>
