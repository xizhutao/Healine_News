<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      @click-left="onClickLeft"
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="articleDetail.title" class="article-detail markdown-body">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleDetail.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetail.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleDetail.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleDetail.pubdate | relativeTime }}
          </div>
          <!-- 关注取消关注 -->
          <FollowUser
            :userId="articleDetail.aut_id"
            v-model="articleDetail.is_followed"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          v-if="articleDetail.title"
          v-html="articleDetail.content"
          ref="articleContent"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <CommentList
          :list="ComentList"
          @totalCommentCount="commentCount = $event"
          :ArticleId="articleDetail.art_id"
        ></CommentList>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPopShow = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="commentCount" color="#777" />
          <Collect
            v-model="articleDetail.is_collected"
            :ArticleId="articleDetail.art_id"
          />
          <GoodJob
            v-model="articleDetail.attitude"
            :ArticleId="articleDetail.art_id"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <van-popup v-model="isPopShow" position="bottom">
          <ComentPost @PopSuccess="PopSuccess" :target="articleDetail.art_id" />
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="getArticle" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 回复弹出层 -->
    <van-popup
      v-if="isReplayShow"
      style="height: 100%"
      v-model="isReplayShow"
      position="bottom"
    >
      <CommentReplay :CommentObj="commentTarget" />
    </van-popup>
  </div>
</template>

<script>
import './github-markdown.css'
import { getAticleDetail } from '@/api/article'
import { ImagePreview } from 'vant'
import Collect from '@/components/Collect.vue'
import FollowUser from '@/components/FollowUser.vue'
import GoodJob from '@/components/GoodJob.vue'
import CommentList from './components/CommentList.vue'
import ComentPost from '@/components/ComentPost.vue'
import CommentReplay from '@/components/CommentReplay.vue'
export default {
  name: 'ArticleIndex',
  components: { FollowUser, Collect, GoodJob, CommentList, ComentPost, CommentReplay },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  data () {
    return {
      articleDetail: {},
      errStatus: 0,
      loading: true,
      btn_loading: false,
      commentCount: 0,
      isPopShow: false,
      ComentList: [],
      isReplayShow: false,
      commentTarget: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticle()
    // 重新加载
  },
  mounted () {
    this.$bus.$on('replay', (commentObj) => {
      this.isReplayShow = true
      // 将传过来的评论对象储存起来
      this.commentTarget = commentObj
    })
    this.$bus.$on('closePop', (value) => {
      this.isReplayShow = value
    })
  },
  methods: {
    // 获取文章详情
    async getArticle () {
      try {
        const res = await getAticleDetail(this.articleId)
        const { data: article } = res.data
        this.articleDetail = article
        console.log(this.articleDetail)
        // 数据更新完毕后
        setTimeout(() => {
          this.preImage()
        }, 0)
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log(err)
      }
      // 关闭loding状态
      this.loading = false
    },
    // 预览图片
    preImage () {
      const doms = this.$refs.articleContent
      const images = doms?.querySelectorAll('img')
      const imagesUrl = []
      images.forEach((img, index) => {
        imagesUrl.push(img.currentSrc)
        img.onclick = () => {
          ImagePreview({
            images: imagesUrl,
            startPosition: index
          })
        }
      })
    },
    // tabbar路由跳转
    onClickLeft () {
      this.$router.push('/home')
    },
    PopSuccess (newComent) {
      // 关闭弹出层
      this.isPopShow = false
      // 将发布的评论push到评论列表最前面
      this.ComentList.unshift(newComent)
      this.$toast.success('发布成功')
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
