<template>
  <!-- 评论列表 -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <AticleCommentItem
      v-for="(item, index) in list"
      :key="index"
      :commentContent="item"
    />
  </van-list>
</template>

<script>
import { getCommentList } from '@/api/Comment'
import AticleCommentItem from '@/components/AticleCommentItem.vue'
export default {
  name: 'ComentList',
  props: {
    ArticleId: {
      type: [String, Number],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  created () {
    // 获取文章评论的列表
    this.onLoad()
    this.loading = true
  },
  data () {
    return {
      loading: false,
      finished: false,
      limit: 10,
      offset: null
    }
  },
  methods: {
    async onLoad () {
      // 1、获取数据
      const res = await getCommentList({
        type: this.type,
        source: this.ArticleId,
        offset: this.offset,
        limit: this.limit
      })
      const { results, total_count: totalCount } = res.data.data
      this.$emit('totalCommentCount', totalCount)
      // 2、将数据push到列表中
      this.list.push(...results)
      // 3、将loading改成false
      this.loading = false
      // 4、判断是否有数据了
      if (results.length) {
        // 有数据。更新页码的偏移量
        this.offset = res.data.data.last_id
      } else {
        // 没有数据将finished改成true
        this.finished = true
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { AticleCommentItem }
}
</script>

<style scoped lang='less'>
</style>
