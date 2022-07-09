import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // 首页默认页面
  { path: '/', component: Home, name: 'home' }
]

const router = new VueRouter({ routes });

export default router
