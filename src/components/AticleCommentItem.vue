<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commentContent.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ commentContent.aut_name }}</div>
      <van-button
        :loading="likeLoading"
        @click="commentLike"
        class="like-btn"
        :class="{
          liked: commentContent.is_liking,
        }"
        :icon="commentContent.is_liking ? 'good-job' : 'good-job-o'"
        >{{ commentContent.like_count || "赞" }}</van-button
      >
    </div>

    <div slot="label">
      <p class="comment-content">{{ commentContent.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{
          commentContent.pubdate | relativeTime
        }}</span>
        <van-button class="reply-btn" round @click="replayComent"
          >回复 {{ commentContent.reply_count }}</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, cancelCommentLike } from '@/api/Comment'
export default {
  name: 'CommentItem',
  props: {
    commentContent: {
      type: Object,
      required: true
    }
  },
  components: {},
  data () {
    return {
      likeLoading: false
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async commentLike () {
      this.likeLoading = true
      if (this.commentContent.is_liking) {
        // 已点赞取消点赞
        await cancelCommentLike(this.commentContent.com_id)
        this.commentContent.like_count--
      } else {
        // 没有点赞添加点赞
        await addCommentLike(this.commentContent.com_id)
        this.commentContent.like_count++
      }
      this.commentContent.is_liking = !this.commentContent.is_liking
      this.likeLoading = false
    },
    // 弹出祖组件的回复评论弹出层
    replayComent () {
      this.$bus.$emit('replay', this.commentContent)
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
    &.liked {
      color: orange;
    }
  }
}
</style>
