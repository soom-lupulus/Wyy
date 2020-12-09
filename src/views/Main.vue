<template>
  <div class="father">
    <!-- 头部导航栏 -->
    <div class="navouter">
      <my-nav
        v-on:gotoSearch="toggleState"
        v-on:goBackMain="middlecomponent = `tags`"
      />
    </div>
    <!-- 中间标签 -->
    <!-- <tags></tags> -->
    <component v-bind:is="middlecomponent"></component>
    <!-- 中间分页 -->
    <router-view v-if="middlecomponent === 'tags'"></router-view>
    
    <!-- 完整播放 -->
    <!-- <complete-play @destroy="destroy" :isshow="complete_play_visible" /> -->
  </div>
</template>

<script>
import myNav from "../components/myNav";
import bottomPlay from "../components/BottomPlay";
import tags from "../components/Tags";
import searchList from "../components/SearchList";
import completePlay from "../components/CompletePlay";
import { mapState } from "vuex";

export default {
  components: {
    myNav,
    bottomPlay,
    tags,
    searchList,
    completePlay,
  },
  created() {
    //获取用户歌单
    this.$store.dispatch("getUserSongList", this.userinfo.account.id);
    //获取用户信息 , 歌单，收藏，mv, dj 数量
    // this.$store.dispatch("getUserInfo1");
    //获取用户播放记录
    this.$store.dispatch("getUserPlayedSongsRecord", this.userinfo.account.id);
    //获取用户喜欢列表
    this.$store.dispatch("getUserLikedSongsIds", this.userinfo.account.id);
  },
  data() {
    return {
      //展示四个标签，或者播放列表
      middlecomponent: "tags",
      //完整播放页可见性
      complete_play_visible: false,
    };
  },
  computed: {
    ...mapState(["userinfo"]),
  },
  methods: {
    toggleState() {
      this.middlecomponent = "searchList";
      // console.log('我服了');
    },
    showCompletePlay() {
      this.complete_play_visible = !this.complete_play_visible;
      // console.log('this.complete_play_visible');
    },
    destroy() {
      this.complete_play_visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.navouter {
  width: 100%;
  height: 4rem;
}
.father {
  width: 100vw;
  // position: relative;
  height: 100vh;
  // overflow: hidden;
}
</style>