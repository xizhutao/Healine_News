<template>
  <div class="updateWrapper">
    <img class="img" ref="img" :src="img" alt="" />
    <div class="toobar">
      <div class="cancle" @click="$emit('close')">取消</div>
      <div class="confirm" @click="finish">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updatePhote } from '@/api/user'
export default {
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  created () { },
  data () {
    return {
      cropper: {}
    }
  },
  methods: {
    // 裁切完成
    finish () {
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // 创建formData数据
        const formData = new FormData()
        formData.append('photo', blob)
        const res = await updatePhote(formData)
        // const {data} = res.data
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('update-img', res.data.data.photo)
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      // aspectRatio: 16 / 9,
      // crop (event) {
      //   console.log(event.detail.x)
      //   console.log(event.detail.y)
      //   console.log(event.detail.width)
      //   console.log(event.detail.height)
      //   console.log(event.detail.rotate)
      //   console.log(event.detail.scaleX)
      //   console.log(event.detail.scaleY)
      // },
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  }
}
</script>

<style scoped lang='less'>
.updateWrapper {
  background-color: black;
  height: 100%;
  .img {
    max-width: 100%;
  }
  .toobar {
    display: flex;
    font-size: 30px;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    bottom: 10px;
    padding: 0 20px;
    .cancle {
      text-align: center;
      color: white;
    }
    .confirm {
      color: white;
    }
  }
}
</style>
