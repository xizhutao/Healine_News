<template>
  <div class="searchSuggest">
    <template v-if="suggestList[0] !== null">
      <van-cell v-for="(item, index) in suggestList" :key="index" icon="search">
        <template #title>
          <div v-html="higthLight(item)" @click="$emit('search', item)"></div>
        </template>
      </van-cell>
    </template>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    inputValue: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      suggestList: []
    }
  },
  methods: {
    async getSuggestList (q) {
      try {
        const res = await getSearchSuggestion(q)
        this.suggestList = res.data.data.options
      } catch (err) {
        this.$toast('请求失败')
      }
    },
    // 高亮处理
    higthLight (text) {
      const reg = new RegExp(this.inputValue, 'gi')
      const result = text?.replace(reg, `<span style="color: red">${this.inputValue}</span>`)
      return result
    }
  },
  computed: {},
  watch: {
    inputValue: {
      handler: debounce(function (newValue) {
        this.getSuggestList(newValue)
      }, 500),
      immediate: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.searchSuggest {
  margin-top: 108px;
}
</style>
