<template>
  <div>
    <van-nav-bar @click-left="$router.back()" title="登录">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请填写手机号' },
          {
            pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
            message: '不符合手机的格式',
          },
        ]"
      >
        <MyIcon :name="shouji" slot="left-icon"></MyIcon>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码长度必须是六位' },
        ]"
      >
        <MyIcon :name="yanzhengma" slot="left-icon"></MyIcon>
        <template #button>
          <van-count-down
            @finish="isCountDownShow = false"
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
          />
          <van-button
            v-else
            class="yzm"
            @click="onSendSms"
            native-type="button"
            size="small"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import MyIcon from '@/components/MyIcon'
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111', // 手机号
      code: '246810', // 短信验证码,
      time: 60 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('手机格式不正确')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { MyIcon }
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  .van-button__text {
    zoom: 0.95;
  }
}
.login {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #ffffff;
}
.van-count-down {
  position: fixed;
  right: 20px;
}
.yzm {
  position: fixed;
  right: 10px;
}
</style>
