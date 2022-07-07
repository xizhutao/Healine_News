<template>
  <van-icon
    color="#777"
    :class="{ collected: value }"
    :name="value ? 'star' : 'star-o'"
    @click="onCollect"
    :loading="isloading"
  />
</template>

<script>
import { cancelCollect, addCollect } from '@/api/article'
export default {
  name: 'Collect',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    ArticleId: {
      type: [String, Number, Object],
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
    // 收藏、取消收藏
    async onCollect () {
      this.isloading = true
      try {
        if (this.value) {
          // 已经收藏取消收藏
          const res = await cancelCollect(this.ArticleId)
          console.log(res)
          this.$toast('取消收藏')
        } else {
          // 未收藏，点击收藏
          await addCollect(this.ArticleId)
          this.$toast('收藏成功')
        }
      } catch (err) {
        this.$toast.fail('操作失败')
        console.log(err)
      }
      // 通知父组件更改是否收藏的数据
      this.$emit('input', !this.value)
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
.collected {
  color: orange !important;
}
</style>
