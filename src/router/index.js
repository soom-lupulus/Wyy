import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Main from '../views/Main'
import Mine from '../components/Mine'
import Recommend from '../components/Recommend'

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
    redirect: '/main/mine',
    component: Main,
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
  }
]



const router = new VueRouter({
  routes
})

//全局路由导航守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/main/recommend'){
    next()
  }else{
    next()
  }
  
})



export default router
