<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- input框 -->
    <input type="file" ref="file" hidden @change="onChange" />
    <!-- /导航栏 -->
    <van-cell @click="$refs.file.click()" title="用户头像" is-link>
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      @click="updataUserNameShow = true"
      :value="user.name"
      is-link
    />
    <van-cell title="性别" :value="user.gender === 1 ? '男' : '女'" is-link />
    <van-cell
      title="生日"
      @click="updataBirthdayShow = true"
      :value="user.birthday"
      is-link
    />
    <!-- 修改名字弹出层 -->
    <van-popup
      v-model="updataUserNameShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdateName
        v-model="user.name"
        v-if="updataUserNameShow"
        @close="updataUserNameShow = false"
      />
    </van-popup>
    <!-- 修改图像弹出层 -->
    <van-popup v-model="updataPhotoShow" style="height: 100%" position="bottom">
      <UpdatePhoto
        v-if="updataPhotoShow"
        @update-img="user.photo = $event"
        @close="updataPhotoShow = false"
        :img="img"
      />
    </van-popup>
    <!-- 修改生日弹出层 -->
    <van-popup
      v-model="updataBirthdayShow"
      style="height: 100%"
      position="bottom"
    >
      <UpdateBirthday />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './UpdateName'
import UpdatePhoto from './UpdatePhote'
import UpdateBirthday from './UpdateBirthday'
export default {
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      user: {},
      updataUserNameShow: false,
      updataPhotoShow: false,
      img: '',
      updataBirthdayShow: false
    }
  },
  methods: {
    // 获取用户资料
    async getUserInfo () {
      try {
        const res = await getUserProfile()
        const { data } = res.data
        this.user = data
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取用户个人资料失败')
      }
    },
    //
    onChange () {
      const file = this.$refs.file.files[0]
      const data = window.URL.createObjectURL(file)
      this.updataPhotoShow = true
      this.img = data
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { UpdateName, UpdatePhoto, UpdateBirthday }
}
</script>

<style scoped lang='less'>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
.van-popup {
  background: #f5f7f9;
}
</style>
