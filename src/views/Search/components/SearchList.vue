<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSeachList } from '@/api/search'
export default {
  name: 'SearchList',
  props: {
    inputValue: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        //  1、请求数据
        const res = await getSeachList({
          page: this.page,
          per_page: this.per_page,
          q: this.inputValue
        })
        console.log(res)
        const { results } = res.data.data
        // 2、将数据存到数组中
        this.list.push(...results)
        // 3、将loading改为false
        this.loading = false
        // 4、判断还有没有数据
        // 有数据将page更新
        if (results.length) {
          this.page++
        } else {
          // 没有数据将finished改为结束
          this.finished = true
        }
      } catch (err) {
        this.error = true
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-list {
  overflow: auto;
  height: calc(100vh - 108px);
  margin-top: 108px;
}
</style>
