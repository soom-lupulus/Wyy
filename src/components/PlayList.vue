<template>
  <div>
    <div v-show="show_list">
      <!-- 卡片层 -->
      <el-card>
        <div class="wrapper" ref="wrapper">
          <!-- <p>我是播放列表</p> -->
          <ul ref="myul" v-if="playinglist">
            <li v-for="(item, index) in playinglist" :key="index" @click="theSongClick(item)">
              <p ref="myps">{{ item.name }}</p>
              <i class="fa fa-times" aria-hidden="true" @click.stop="removeIt(item)"></i>
            </li>
          </ul>
        </div>
      </el-card>
      <!-- 遮罩层 -->
      <div class="bg" @click="$emit('update:show_list', false)"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BScroll from "@better-scroll/core";
export default {
  props: ["show_list"],
  data() {
    return {
      bs: {}
    };
  },
  computed: {
    ...mapState(["playinglist", "playing_list_index", "songlistInfo"]),
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.playing_list_index);
      this.$refs.myps[this.playing_list_index].classList.add("onplaying");

      this.bs = new BScroll(this.$refs.wrapper, {
        click: true,
        mouseWheel: true,
        // specifiedIndexAsContent: 1,
      });
      
    });
  },
  updated() {
    this.bs = new BScroll(this.$refs.wrapper, {
        click: true,
        mouseWheel: true,
        // specifiedIndexAsContent: 1,
    });
  },
  watch: {
    playing_list_index: function(newVal, oldVal){
      // console.log(newVal, oldVal);
      if(this.playing_list_index === undefined) return;
      this.$refs.myps[newVal].classList.add("onplaying");
      this.$refs.myps[oldVal].classList.remove("onplaying");
    }
  },
  methods: {
    // 歌单中的歌曲点击
    theSongClick(item){
      // 换歌
      this.$store.dispatch('getPlayingSongUrl', item.id)
      // 修改歌单正在播放的歌曲样式(修改下标)
      const cur_index = this.songlistInfo.playlist.tracks.indexOf(item)
      this.$store.commit('playing_list_index', {
        type: true,
        val: cur_index
      })
      // 修改页面,也就是保存下一首的歌曲信息
      this.$store.dispatch("savePlayingSong", item);

    },

    // 歌单中的删除歌曲标签点击
    removeIt(item){
      console.log(item);
      // 拿到下标
      const cur_index = this.songlistInfo.playlist.tracks.indexOf(item)
      this.$store.dispatch('removeOneFromPlayList', cur_index)
    }
  }
};
</script>

<style lang="less" scoped>
.el-card {
  width: 90%;
  height: 50vh;
  position: absolute;
  bottom: 0.4rem;
  z-index: 19;
  border-radius: 1em;
  left: 0;
  right: 0;
  margin: 0 auto;
  .wrapper {
    height: 50vh;
    ul {
      li {
        padding: 1rem 0;
        display: flex;
        list-style: none;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
.bg {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  z-index: 18;
}
.onplaying {
  color: rgb(73,172,248);
}
</style>