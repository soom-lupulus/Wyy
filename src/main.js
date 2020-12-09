import Vue from 'vue'
import App from './App.vue'
import router from './router'

import store from './store'
//导入全局样式
import './assets/global.css'
//引入axios
import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
})
Vue.prototype.$http = instance
//引入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);
//引入字体图标
import 'font-awesome/css/font-awesome.min.css'
import './assets/iconfont/iconfont.css'
//引入过滤器
import './filter/index'
//建立事件管理中心
Vue.prototype.$bus = new Vue()
//引入动画
import 'animate.css'
//引入elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
