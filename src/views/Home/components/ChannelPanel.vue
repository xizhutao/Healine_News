<template>
  <div>
    <!-- 我的频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          round
          size="mini"
          @click="isCloseShow = !isCloseShow"
          type="danger"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col v-for="(item, index) in channels" :key="item.id" span="6">
          <div
            @click="onClick(index)"
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon
              v-show="isCloseShow"
              v-if="index !== 0"
              name="close"
              :style="{ color: active === index ? 'red' : '' }"
            />
          </div>
        </van-col>
      </van-row>
    </div>
    <!-- 推荐频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in recommendChannels" :key="item.id">
          <div @click="addChannel(item.id)" class="inner">{{ item.name }}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getAllChannels, saveChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELS = 'channels'
export default {
  name: 'ChannelPanel',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllChannels()
      this.recommendChannels = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      recommendChannels: [],
      isCloseShow: false
    }
  },
  methods: {
    addChannel (id) {
      const index = this.recommendChannels.findIndex(item => item.id === id)
      this.channels.push(this.recommendChannels[index])
      this.recommendChannels.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        if (index === 0) return
        // 删除
        const obj = this.channels[index]
        this.channels.splice(index, 1)
        this.recommendChannels.push(obj)
        if (index < this.active) {
          this.$emit('del-event', this.active - 1)
        }
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  computed: {},
  watch: {
    channels: {
      deep: true,
      async handler (newVal) {
        console.log(newVal)
        if (this.$store.state.user && this.$store.state.user.token) {
          // 将拿到的数据处理成对象的形式
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      }
    }
  },
  filters: {},
  components: {}

}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    padding-left: 24px;
    padding-right: 16px;
    margin-bottom: 16px;
    h3 {
      font-size: 32px;
      font-weight: normal;
      color: #333;
    }
    .van-button {
      width: 104px;
      height: 48px;
      border-radius: 20px;
    }
  }
  .inner {
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    border-radius: 6px;
    font-family: MicrosoftYaHei;
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 86px;
    color: #222222;
    text-align: center;
    margin-left: 14px;
    position: relative;
    .van-icon-close {
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(40%, -50%);
    }
  }
  .van-col {
    margin-bottom: 22px;
  }
}
</style>
