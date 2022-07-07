import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const Search = () => import('@/views/Search')
const ArticleDetail = () => import('@/views/ArticleDetail')
const UserProfile = () => import('@/views/UserProfile')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'video', component: Video },
      { path: 'question', component: Question },
      { path: 'my', component: My, name: 'my' }
    ]
  },
  {
    path: '/login', component: Login
  },
  { path: '/search', component: Search },
  { name: 'article', path: '/article/:articleId', props: true, component: ArticleDetail },
  { name: 'user-profile', path: '/user/profile', component: UserProfile }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
