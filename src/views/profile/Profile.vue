<template>
  <div>
    <nav-bar class="profile-navbar">
      <div slot="center">我的</div>
    </nav-bar>
    <div class="head">
      <img src="~assets/img/profile/avatar.svg">
      <div class="head-content">
        <table>
          <tr class="content-text">登录/注册</tr>
          <tr class="content-phone">暂无绑定手机号</tr>
        </table>

      </div>
      <div class="head-right">
        <img src="~assets/img/common/arrow-left.svg">
      </div>
    </div>
    <div class="profile-content">
      <div class="detail">
        <tr><p class="number">0</p><p>元</p></tr>
        <tr>我的余额</tr>
      </div>
      <div class="detail">
        <tr><p class="number">0</p><p>个</p></tr>
        <tr>我的优惠</tr>
      </div>
      <div class="detail">
        <tr><p class="number">0</p><p>分</p></tr>
        <tr>我的积分</tr>
      </div>
    </div>
    <div class="center">
      <div class="center-item">
        <div class="center-img"><img src="~assets/img/profile/message.svg"></div>
        <div class="title"><div>我的消息</div></div>
      </div>
      <div class="center-item">
        <div class="center-img"><img src="~assets/img/profile/shopping.svg"></div>
        <div class="title"><div>积分商城</div></div>
      </div>
      <div class="center-item">
        <div class="center-img"><img src="~assets/img/profile/vip.svg"></div>
        <div class="title"><div>会员卡</div></div>
      </div>
    </div>
    <div class="other">
      <div class="other-item">
        <div class="other-img"><img src="~assets/img/profile/cart.svg"></div>
        <div class="title"><div>我的购物车</div></div>
      </div>
      <div class="other-item">
        <div class="other-img"><img src="~assets/img/profile/pointer.svg"></div>
        <div class="title"><div>下载购物APP</div></div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navbar/NavBar";

  export default {
    name: "Profile",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .profile-navbar {
    background-color: var(--color-tint);
    color: #fff;
    position: relative;
  }

  .head {
    height: 75px;
    background-color: var(--color-tint);
    padding: 0 10px;
    display: flex;
    align-items: center;
  }

  .head img {
    height: 60px;
  }

  .head-content {
    color: #fff;
    display: flex;
    width: 120px;
    margin-left: 10px;
    font-size: 13px;
    position: relative;
    line-height: 18px;
  }

  .content-phone::before{
    content: '    ';
    white-space: pre;
    background: url("~assets/img/profile/phone.svg") 0 0/14px 14px;
  }

  .content-phone {
    margin-left: 12px;
  }

  .head-right {
    display: flex;
    position: absolute;
    right: 10px;
  }

  .head-right img{
    height: 25px;
  }

  .profile-content {
    display: flex;
    border-bottom: 10px solid #f1f1f1;
  }

  .profile-content div {
    flex: 1;
  }

  .detail {
    padding-top: 10px;
    height: 100%;
    border-right: 1px solid #e5e5e5;
    padding-bottom: 10px;
  }

  .detail tr{
    display: flex;
    flex: 1;
    text-align: center;
    justify-content:  center;
    padding-top: 5px;
    font-size: 13px;
    vertical-align: middle;
    line-height: 20px;
  }

  .number {
    font-size: 20px;
    color: red;
    font-weight: bold;
  }

  .center {
    border-bottom: 20px solid #f1f1f1;
  }

  .center-item {
    padding: 5px 5px;
    display: flex;
    line-height: 20px;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
  }


  .other-item {
    padding: 5px 5px;
    display: flex;
    line-height: 20px;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
  }

  .center-img img{
    padding: 0 3px;
    width: 25px;
    height: 25px;
  }

  .other-img img{
    padding: 0 3px;
    width: 25px;
    height: 25px;
  }
</style>
