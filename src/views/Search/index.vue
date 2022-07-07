<template>
  <div>
    <!-- 搜索框 -->
    <form action="/" class="navSearch">
      <van-search
        v-model="inputValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowList = false"
        background="#3296fa"
      />
    </form>
    <!--/ 搜索框 -->
    <!-- 搜索列表 -->
    <SearchList v-if="isShowList" :inputValue="inputValue"></SearchList>
    <!-- /搜索列表 -->
    <!-- 搜索建议 -->
    <SearchSuggestion
      v-else-if="inputValue"
      :inputValue="inputValue"
      @search="onSearch"
    ></SearchSuggestion>
    <!-- /搜索建议 -->
    <!-- 搜索历史 -->
    <SearchHistory
      @search="onSearch"
      @allDelete="deleteTotal"
      v-else
      :searchHistories="searchHistories"
    ></SearchHistory>
    <!-- /搜索历史 -->
  </div>
</template>

<script>
import { setItem, getItem } from '@/utils/storage'
import SearchList from '@/views/Search/components/SearchList'
import SearchHistory from '@/views/Search/components/SearchHistory'
import SearchSuggestion from '@/views/Search/components/SearchSuggestion'
export default {
  name: 'Search',
  created () { },
  data () {
    return {
      inputValue: '',
      isShowList: false,
      searchHistories: getItem('searchHistories') || []
    }
  },
  methods: {

    onSearch (val) {
      this.inputValue = val
      // 将搜索的记录储存起来
      // 储存之前判断是否有重复的记录， 有的话，先将重复的删除在，存放到数组中
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isShowList = true
    },
    onCancel () {
      this.$router.back()
    },
    deleteTotal (val) {
      this.searchHistories = val
    }
  },
  computed: {},
  watch: {
    searchHistories (newValue) {
      // 只要搜索历史一变化将新的搜索历史记录存放到本地存储
      setItem('searchHistories', newValue)
    }
  },
  filters: {},
  components: { SearchList, SearchHistory, SearchSuggestion }
}
</script>

<style scoped lang='less'>
.van-search__action {
  color: white;
}
.navSearch {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
