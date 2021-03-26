import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'mint-ui';

import Login from '../views/Login'
import Main from '../views/Main'
import Mine from '../components/Mine'
import Recommend from '../components/Recommend'
import SongListInfo from '../components/SongListInfo'
import CompletePlay from '../components/CompletePlay'

//解决路由重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/main',
    component: Main,
    redirect: '/main/mine',
    children: [
      {
        path: 'mine',
        component: Mine
      },
      {
        path: 'recommend',
        component: Recommend
      },
      {
        path: 'mine1',
        component: Mine
      },
      {
        path: 'mine2',
        component: Mine
      }
    ]
  },
  {
    path: '/mysonglist/:songlistid',
    component: SongListInfo,
    props: true
  },
  {
    path: '/complete',
    component: CompletePlay
  },
]



const router = new VueRouter({
  routes
})

// 全局路由导航守卫
router.beforeEach((to, from, next) => {
  if (from.path !== '/') {
    const token = sessionStorage.getItem('token')
    if (!token) {
      Toast('请先登录！')
    } else {
      console.log('yes');
      next()
    }
  }else{
    next()
  }
})



export default router
