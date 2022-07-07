import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'amfe-flexible'
import '@/styles/index.less'
import MyIcon from '@/components/MyIcon'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
// 配置时间全局语言环境
dayjs.locale('zh-cn')
// import * as obj from '@/filters'
Vue.use(MyIcon)
Vue.use(Vant)
Vue.config.productionTip = false

// 注册全局过滤器
// 注册
Vue.filter('relativeTime', function (value) {
  dayjs.extend(relativeTime)
  const publishTime = dayjs(value)
  const RelativeTime = publishTime.fromNow()
  // 返回处理后的值
  return RelativeTime
})
// // 批量生成过滤器
// Object.keys(obj).forEach(key => {
//   Vue.filters(key, obj[key])
// })
new Vue({
  router,
  store,
  render: h => h(App),
  // 安装全局事件总线
  beforeCreate () {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
