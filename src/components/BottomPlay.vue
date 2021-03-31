<template>
  <div>
    <!-- 底部播放 -->
    <div class="outer">
      <div class="left">
        <!-- <p>{{playingsong.al.picUrl}}</p> -->
        <img :src="songavatar" alt="" />
      </div>
      <div class="middle">
        <div class="content">
          <p>{{ songname }}</p>
          <p>{{ singername }}</p>
        </div>
      </div>
      <div class="right">
        <div class="icon">
          <!-- 点击播放 -->
          <i
            class="fa fa-play-circle-o"
            aria-hidden="true"
            v-show="playingbuttonstate"
            @click.stop="playSong"
          ></i>
          <!-- 点击暂停 -->
          <i
            class="fa fa-pause-circle-o"
            aria-hidden="true"
            v-show="!playingbuttonstate"
            @click.stop="pauseSong"
          ></i>
          <!-- <span>{{ currenttime }}</span> -->
        </div>
      </div>
    </div>
    <!-- 歌曲 -->
    <audio
      :src="songurl"
      autoplay
      ref="myaudio"
      @canplay="audioLoaded"
      @timeupdate="getSongCurrentTime"
      @ended="audioEnd"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["playingsong",'playingbuttonstate']),
    ...mapGetters(["songname", "singername", "songavatar", "songurl"]),
    
  },
  data() {
    return {
      currenttime: 0,
    };
  },
  watch: {
    //监听按钮状态
    playingbuttonstate(val){
      val ? this.$refs.myaudio.pause() : this.$refs.myaudio.play();
    }
  },
  created() {
    this.$bus.$on("getSongCurrentTime");
  },
  methods: {
    pauseSong() {
      this.$store.dispatch('toggleBtnState')
      this.$refs.myaudio.pause();
    },
    playSong() {
      this.$store.dispatch('toggleBtnState')
      this.$refs.myaudio.play();
    },
    audioLoaded() {
      // console.log(this.$refs.myaudio);
      this.$store.dispatch(
        "getPlayingSongDuration",
        this.$refs.myaudio.duration
      );
    },
    audioEnd(){
      console.log('播放结束');
      this.$bus.$emit('changeBtnState')
    },
    getSongCurrentTime() {
      // console.log('拿到了~');
      this.$nextTick(() => {
        // console.log(this.$refs.myaudio.currentTime);
        this.currenttime = this.$refs.myaudio.currentTime;

        // console.log(this.currenttime);
        this.$store.dispatch("getPlayingSongCurrentTime", this.currenttime);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.outer {
  width: 100%;
  position: fixed;
  // z-index: 999;
  bottom: 0;
  display: flex;
  border-top: 0.01rem solid rgba(218, 210, 210, 0.5);
  background-color: #fff;
  .left {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .middle {
    width: 60%;
    .content {
      p {
        white-space: nowrap;
        text-align: center;
        line-height: 2rem;
      }
    }
  }
  .right {
    width: 20%;
    .icon {
      text-align: center;
      line-height: 4rem;
      font-size: 2rem;
    }
  }
}
</style>