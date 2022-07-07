<template>
  <van-cell-group>
    <van-pull-refresh
      ref="pullrefresh"
      v-model="refreshing"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>
<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getAticleList } from '@/api/home'
let ele = null
let scrollTop = 0
export default {
  name: 'Articles',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () { this.getAticleList() },
  mounted () {
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated () {
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      finished: false,
      loading: false,
      refreshing: false
    }
  },
  methods: {
    async getAticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getAticleList({ channel_id: this.id, timestamp: this.timestamp })
        this.timestamp = res.data.data.pre_timestamp
        // 数据加载完毕将finished改成true
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        // 数据加载完毕将loading设置成false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getAticleList()
    },
    onRefresh () {
      this.timer = setTimeout(() => {
        console.log(123)
        this.finished = false
        this.loading = true
        this.timestamp = Date.now()
        this.getAticleList()
      }, 1000)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem },
  beforeDestroy () {
    clearTimeout(this.timer)
  }

}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>
