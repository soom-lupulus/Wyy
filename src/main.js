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
//引入momentjs
import moment from 'moment'



//定义一个全局过滤器实现日期格式化
Vue.filter('datrfmt',function (input) {//当input为时间戳时，需转为Number类型
  // 使用momentjs这个日期格式化类库实现日期的格式化功能
  return moment(input).format('YYYY-MM-DD');
});



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
