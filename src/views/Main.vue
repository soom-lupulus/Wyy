<template>
  <div>
    <!-- 头部导航栏 -->
    <div class="navouter">
      <my-nav v-on:gotoSearch='toggleState'/>
    </div>
    <!-- 中间标签 -->
    <!-- <tags></tags> -->
    <component v-bind:is="middlecomponent"></component>
    <!-- 中间分页 -->
    <router-view v-if="middlecomponent === 'tags'"></router-view>
    <!-- 底部播放 -->
    <bottom-play/>
  </div>
</template>

<script>
import myNav from '../components/myNav'
import bottomPlay from '../components/BottomPlay'
import tags from '../components/Tags'
import searchList from '../components/SearchList'

export default {
  components:{
    myNav,
    bottomPlay,
    tags,
    searchList
  },
  mounted() {
    //获取用户信息 , 歌单，收藏，mv, dj 数量
    this.getUserInfo1()
  },
  data() {
    return {
      middlecomponent: 'tags'
    }
  },
  methods: {
    //获取用户信息 , 歌单，收藏，mv, dj 数量
    getUserInfo1(){
      this.$store.dispatch('getUserInfo1')
    },
    toggleState(){
      this.middlecomponent = 'searchList'
      console.log('我服了');
    }
  },
}
</script>

<style lang="less" scoped>
.navouter{
  width: 100%;
  height: 4rem;
}
</style>