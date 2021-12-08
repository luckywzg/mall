<template>
  <div class="comment">
    <div class="comment-more clear-fix">
      <div class="left">用户评价</div>
      <div class="right">更多 ></div>
    </div>
    <div class="comment-name clear-fix">
      <img :src="commentInfo.avatar" alt="">
      <span>{{commentInfo.uname}}</span>
    </div>
    <div class="comment-content">
      <p>{{commentInfo.content}}</p>
      <span>{{commentInfo.created | showDate}}</span>
      <span>{{commentInfo.style}}</span>
      <div v-if="commentInfo.images" class="comment-content-img">
        <div  class="comment-img" v-for="item in commentInfo.images">
          <img :src="item" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "common/utils";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      //1、将时间戳转化成Date对象
      const date = new Date(value * 1000)
      //2、将date进行格式化
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
  .comment-more {
    margin: 0 15px;
    border-bottom: 2px solid #d0cfcf;
  }
  .comment-more div {
    padding: 10px 0;
    display: inline-block;
  }
  .comment-name {
    padding: 20px 10px;
}
  .comment-name img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: left;
  }
  .comment-name span {
    float: left;
    line-height: 40px;
    padding-left: 10px;
  }
  .comment-content {
    width: 100%;
    font-size: 13px;
    padding: 0 15px;
    margin-bottom: 10px;
  }
  .comment-content p {
    margin-bottom: 5px;
  }
  .comment-content span {
    color: #918f8f;
    padding-right: 10px;
  }
  .comment-content-img {
    width: 100%;
    height: 100px;
    margin-top: 8px;
  }
  .comment-img {
    width: 300px;
  }
  .comment-img img {
    float: left;
    width: 100px;
    height: 100px;
  }
</style>
