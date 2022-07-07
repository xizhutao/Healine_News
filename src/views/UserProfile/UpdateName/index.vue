<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-right="onConFirm"
      @click-left="$emit('close')"
    />
    <!-- /导航栏 -->
    <div style="padding: 10px">
      <!-- 修改用户信息面板 -->
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入新昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateName } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      reuqired: true
    }
  },
  created () { },
  data () {
    return {
      message: this.value
    }
  },
  methods: {
    async onConFirm () {
      // 输入内容验证
      if (this.message.length === 0) {
        this.$toast('输入内容为空')
        return
      }
      // loding效果
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      // 发请求修改数据
      await updateName({
        name: this.message
      })
      // 用户名修改成功提示父组件关闭弹窗
      this.$emit('close')
      // 将自定义的父组件的视图更新
      this.$emit('input', this.message)
      this.$toast.success('用户名修改成功')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/ .van-nav-bar {
  background-color: #fff !important;
}
</style>
