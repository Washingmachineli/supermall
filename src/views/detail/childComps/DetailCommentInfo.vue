<template>
  <div class="detail-comment" v-if="Object.keys(commentInfo).length !== 0">
    <div class="head">
      <div class="head-title">用户评价</div>
      <div class="head-more">更多</div>
    </div>
    <div class="comment">
      <div class="comment-user">
        <img :src="commentInfo.user.avatar">
        <span>{{commentInfo.user.uname}}</span>
      </div>
      <div class="comment-text">
        <span>{{commentInfo.content}}</span>
      </div>
      <div class="comment-other">
        <span class="comment-data">{{commentInfo.created | showDate}}</span>
        <span class="comment-style">{{commentInfo.style}}</span>
      </div>
      <div class="comment-img">
        <img :src="img" v-for="img in commentInfo.images">
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "@/common/utils";

  export default {
    name: "DetailCommentInfo",
    props: {
      commentInfo: {
        type: Object,
        default: {}
      }
    },
    filters: {
      showDate: function (value) {
        let date = new Date(value * 1000)
        return formatDate(date, 'yyyy-MM-dd')
      }
    }
  }
</script>

<style scoped>
  .detail-comment{
    padding: 5px 15px;
    border-bottom: 5px solid rgba(0,0,0,.1);
  }

  .head {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    border-bottom: 1px solid rgba(0,0,0,.1);
  }

  .head-title {
    float: left;
  }

  .head-more {
    float: right;
  }

  .comment-user{
    padding-top:10px;
    line-height: 44px;
    font-size: 14px;
    /* 让元素垂直中心对齐 */
    display: flex;
    align-items: center;
  }

  .comment-user img {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  .comment-user span {
    padding-left: 10px;
  }

  .comment-text {
    padding: 10px 0;
    font-size: 13px;
  }

  .comment-other {
    padding-bottom: 15px;
    font-size: 11px;
  }

  .comment-style {
    padding-left: 10px;
  }

  .comment-img img {
    width: 70px;
    height: 70px;
    margin-right: 5px;
  }

</style>
