//引入momentjs
import moment from 'moment'
import Vue from 'vue'


//定义一个全局过滤器实现日期格式化
Vue.filter('datrfmt',function (input) {//当input为时间戳时，需转为Number类型
  // 使用momentjs这个日期格式化类库实现日期的格式化功能
  return moment(input).format('YYYY-MM-DD');
});

//定义一个歌曲过滤器
Vue.filter('songfilter', input =>{
    input = ~~input
    let minute = ~~(input / 60)
    let second = input % 60
    return `${minute}:${second}`
})

//定义一个imgUrl过滤器
Vue.filter('imgfilter', input=>{
  return input + '?param=50y50'
})