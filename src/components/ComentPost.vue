<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      :disabled="!message.length"
      @click="onComentPost"
      class="post-btn"
      >发布</van-button
    >
  </div>
</template>

<script>
import { CommentPost } from '@/api/Comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [String, Number, Object],
      required: true
    }
  },
  inject: {
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onComentPost () {
      try {
        const res = await CommentPost({
          target: this.target,
          content: this.message,
          art_id: this.articleId
        })
        console.log(res)
        const { new_obj: newObj } = res.data.data
        // 清空message
        this.message = ''
        // 通知父组件关闭pop弹窗
        // 通知父组件将内容发布评论的到最前面
        this.$emit('PopSuccess', newObj)
        this.$toast.success('发布成功')
      } catch (err) {
        this.$toast.fail('发布失败')
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
