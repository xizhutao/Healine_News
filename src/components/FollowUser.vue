<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="btn_loading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    :loading="btn_loading"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { cancelFollow, addFollow } from '@/api/user'
export default {
  name: 'FollowUser',
  model: {
    prop: 'isFollowed',
    event: 'changeFollow'
  },
  props: {
    userId: {
      type: [String, Number, Object],
      required: true
    },
    isFollowed: {
      type: Boolean,
      required: true
    }
  },
  created () { },
  data () {
    return {
      btn_loading: false
    }
  },
  methods: {
    // 添加、取消关注
    async onFollow () {
      this.btn_loading = true
      try {
        if (this.isFollowed) {
          // 取消关注
          const res = await cancelFollow(this.userId)
          console.log(res)
        } else {
          // 添加关注
          const res = await addFollow(this.userId)
          console.log(res)
        }
        // this.articleDetail.is_followed = !this.articleDetail.is_followed
        // 通知父元素将is_followed取反
        this.$emit('changeFollow', !this.isFollowed)
      } catch (err) {
        this.$toast('操作失败')
        console.log(err)
      }
      this.btn_loading = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
