<template>
  <div>
    <!-- navbar -->
    <van-nav-bar
      ><template #title>
        <div>
          {{
            CommentObj.reply_count
              ? `回复 ${CommentObj.reply_count}`
              : "暂无回复"
          }}
        </div>
      </template>
      <template #left>
        <van-icon @click="onClose" name="cross" />
      </template>
    </van-nav-bar>
    <div class="list_wrapper">
      <!-- 文章评论项 -->
      <AticleCommentItem :commentContent="CommentObj" />
      <!-- 评论回复项 -->
      <van-cell title="全部回复"></van-cell>
      <CommentList
        :list="commenReplaytList"
        :ArticleId="CommentObj.com_id"
        type="c"
      ></CommentList>
    </div>
    <!-- 底部写评论按钮 -->
    <div class="comment_btn">
      <van-button round @click="isCommentReplayShow = true">写评论</van-button>
    </div>
    <!-- pop弹出层 -->
    <van-popup
      v-if="isCommentReplayShow"
      v-model="isCommentReplayShow"
      position="bottom"
    >
      <ComentPost @PopSuccess="postSuccess" :target="CommentObj.com_id" />
    </van-popup>
  </div>
</template>

<script>
import CommentList from '@/views/ArticleDetail/components/CommentList.vue'
import AticleCommentItem from '@/components/AticleCommentItem.vue'
import ComentPost from '@/components/ComentPost.vue'
export default {
  name: 'CommentReplay',
  props: {
    CommentObj: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isCommentReplayShow: false,
      commenReplaytList: []
    }
  },
  methods: {
    onClose () {
      this.$bus.$emit('closePop', false)
    },
    // 回复评论成功
    postSuccess (newObj) {
      // 评论的回复数量加1
      this.CommentObj.reply_count++
      // 关闭弹出层
      this.isCommentReplayShow = false
      // 将评论的数据追加到评论列表的最前面
      this.commenReplaytList.unshift(newObj)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { AticleCommentItem, CommentList, ComentPost }
}
</script>

<style scoped lang='less'>
.comment_btn {
  position: fixed;
  bottom: 0;
  height: 88px;
  width: 100%;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-button {
    width: 60%;
    height: 70%;
  }
}
.list_wrapper {
  width: 100%;
  position: fixed;
  top: 92px;
  bottom: 88px;
  overflow-y: auto;
}
</style>
