<template>
  <div>
    <van-nav-bar fixed title="标题">
      <template #title>
        <van-button icon="search" type="info" class="search_btn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPannelShow">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
      close-icon-position="top-left"
    >
      <ChannelPanel
        @change-active="
          active = $event;
          show = false;
        "
        :active="active"
        :channels="channels"
        @del-event="active = $event"
      ></ChannelPanel>
    </van-popup>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/home.js'
import ChannelPanel from '@/views/Home/components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getItem } from '@/utils/storage'
const CHANNELS = 'channels'
export default {
  name: 'Home',
  created () {
    this.getMychannels()
  },
  data () {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },
  methods: {

    async getMychannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          this.channels = res.data.data.channels
        } catch (err) {
          console.log(err)
        }
      }
    },
    isChannelPannelShow () {
      this.show = true
    }
  },
  computed: {},
  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang='less'>
.search_btn {
  width: 555px;
  height: 64px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
}
.menu {
  min-width: 100px;
  height: 86px;
  background-color: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 86px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  min-width: 100px;
  height: 86px;
  background-color: rgba(255, 255, 255, 0.9);
}
/deep/ .van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
