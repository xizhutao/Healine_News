<template>
  <div>
    <van-cell title="搜索历史" class="historyList">
      <div v-if="isDeleteShow">
        <span @click="$emit('allDelete', [])">全部删除</span>&nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon v-else name="delete-o" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      @click="searchHistoryClick(item, index)"
      v-for="(item, index) in searchHistories"
      :key="index"
    >
      {{ item }}
      <template #right-icon>
        <van-icon name="close" v-show="isDeleteShow" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isDeleteShow: false
    }
  },
  methods: {
    searchHistoryClick (item, index) {
      // 如果处于删除状态执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 如果不处于删除操作，执行搜索
        this.$emit('search', item)
      }
    }
  },
  computed: {},
  watch: {
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.historyList {
  margin-top: 108px;
}
</style>
