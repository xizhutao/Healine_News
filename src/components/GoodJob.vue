<template>
  <van-icon
    :loading="isloading"
    @click="onGoodJob"
    color="#777"
    :class="{ goodjob: value === 1 }"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
  />
</template>
<script>
import { cancelGoodJobArticle, goodJobArticle } from '@/api/article'
export default {
  name: 'GoodJob',
  props: {
    ArticleId: {
      type: [String, Number, Object],
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    }
  },
  created () { },
  data () {
    return {
      isloading: false
    }
  },
  methods: {
    // 点赞、取消点赞
    async onGoodJob () {
      try {
        this.isloading = true
        // 如果attitude === 1 ,attitude === 0
        if (this.value === 0 || this.value === -1) {
          await goodJobArticle(this.ArticleId)
          this.$toast('点赞成功')
          // 通知父组件将更改attitude值
          this.$emit('input', 1)
        } else {
          this.$toast('取消点赞')
          // 如果attitude === 0 || -1 ,attitude === 1
          // 通知父组件将更改attitude值
          await cancelGoodJobArticle(this.ArticleId)
          this.$emit('input', 0)
        }
      } catch (err) {
        this.$toast('操作失败')
        console.log(err)
      }
      this.isloading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.goodjob {
  color: orange !important;
}
</style>
