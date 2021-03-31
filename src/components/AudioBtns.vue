<template>
  <div class="wrapper">
    <div class="outer">
      <i class="fa fa-random" aria-hidden="true"></i>
      <i class="fa fa-step-backward" aria-hidden="true" @click="playLast"></i>
      <div class="playbtns">
        <i
          class="fa fa-play-circle-o"
          aria-hidden="true"
          @click="goPlay"
          v-show="playingbuttonstate"
        ></i>
        <i
          class="fa fa-pause-circle-o"
          aria-hidden="true"
          v-show="!playingbuttonstate"
          @click="goPlay"
        ></i>
      </div>
      <i class="fa fa-step-forward" aria-hidden="true" @click="playNext"></i>
      <i class="fa fa-list-ol" aria-hidden="true" @click="$emit('show-it')"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isshow: false,
    };
  },
  computed: {
    ...mapState(["playingbuttonstate", "playinglist", "playing_list_index"]),
  },
  mounted() {
    this.$bus.$on('changeBtnState',()=>{
      // 播放完毕，改变按钮状态
      this.$store.dispatch("toggleBtnState");
      
    })
  },
  methods: {
    goPlay() {
      this.$store.dispatch("toggleBtnState");
    },
    // 播放下一首
    playNext() {
      const { commit, dispatch } = this.$store;
      const { playinglist, playing_list_index } = this;

      //拿到下一首歌曲的index
      const thesong = playinglist[(playing_list_index + 1 + playinglist.length) % playinglist.length];
      //保存下一首的歌曲信息
      const p1 = dispatch("savePlayingSong", thesong);
      //改变歌曲的url
      const p2 = dispatch("getPlayingSongUrl", thesong.id);
      Promise.all([p1, p2]).then((vals) => {
        //下标后移一位
        commit("playing_list_index");
        
      });
    },
    // 播放上一首
    playLast() {
      const { commit, dispatch } = this.$store;
      const { playinglist, playing_list_index } = this;

      //拿到上一首歌曲的index
      const thesong = playinglist[(playing_list_index - 1 + playinglist.length) % playinglist.length];
      //保存下一首的歌曲信息
      const p1 = dispatch("savePlayingSong", thesong);
      //改变歌曲的url
      const p2 = dispatch("getPlayingSongUrl", thesong.id);
      Promise.all([p1, p2]).then((vals) => {
        //下标后移一位
        commit("playing_list_index", {
          type: false,
          val: -1
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  .outer {
    height: 100%;
    display: flex;
    text-align: center;
    i {
      display: block;
      flex: 1;
      margin: auto;
      font-size: 1.5rem;
    }
    .fa-play-circle-o,
    .fa-pause-circle-o {
      font-size: 4rem;
    }
  }
}
</style>