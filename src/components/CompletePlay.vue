<template>
  <div>
    <transition
      enter-active-class="animate__animated animate__backInUp"
      leave-active-class="animate__animated animate__backOutDown"
    >
      <div class="outer" ref="myself" v-show="isshow">
        <div class="head">
          <i class="fa fa-chevron-down" aria-hidden="true" @click="goDown"></i>
          <i class="iconfont icon-19"></i>
        </div>
        <main>
          <div class="main-top">
            <img :src="songpic" alt="" />
          </div>
          <div class="main-bottom">
            <!-- 喜欢它~~~~~ -->
            <div class="main-bottonm-left">
              <i
                class="fa fa-heart-o"
                aria-hidden="true"
                ref="heart"
                @click="toggleLikeState"
              ></i>
            </div>
            <div class="main-bottonm-center mycenter">
              <p>{{ songname }}</p>
              <p>{{ singername }}</p>
            </div>
          </div>
        </main>
        <footer>
          <div class="process-bar">
            <process-bar></process-bar>
          </div>
          <div class="audio-btns">
            <audio-btns />
          </div>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { mapGetters, mapState } from "vuex";
import processBar from "./ProcessBar";
import audioBtns from "./AudioBtns";
export default {
  props: {
    isshow: Boolean,
  },
  components: {
    processBar,
    audioBtns,
  },
  mounted() {},
  data() {
    return {
      likedyet: false,
    };
  },
  computed: {
    ...mapState(["playingsong", "userlikedsongsids"]),
    ...mapGetters(["songpic", "songname", "singername"]),
  },
  watch: {
    //监视判断正在播放的歌曲是不是喜欢的歌曲
    playingsong(val) {
      const { id } = this.playingsong;

      this.likedyet = this.userlikedsongsids.some((item) => {
        return item === id;
      });
      console.log(this.likedyet);
      // 删除所有类名
      this.$nextTick(() => {
        this.$refs.heart.classList.remove("fa-heart", "fa-heart-o");
        if (this.likedyet) {
          this.$refs.heart.classList.add("fa-heart");
        } else {
          this.$refs.heart.classList.add("fa-heart-o");
        }
      });
      // console.log(this.$refs.heart);
    },
  },
  methods: {
    goDown() {
      //   console.log(this.$refs.myself);
      // this.$refs.myself.style.top = '100vh'
      //   this.$refs.myself.style.opacity = '0'
      this.$emit("destroy");
    },
    async toggleLikeState() {
      const { id } = this.playingsong;
      const { data: res } = await this.$http.post("/like", {
        id,
        like: !this.likedyet,
      });
      if (res.code === 200) {
        this.likedyet = !this.likedyet
        this.$refs.heart.classList.remove("fa-heart", "fa-heart-o");
        if (this.likedyet) {
          this.$refs.heart.classList.add("fa-heart");
          Toast('喜欢成功~')
        } else {
          this.$refs.heart.classList.add("fa-heart-o");
          Toast('取消成功~')
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.outer {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  // z-index: 99;
  // margin-top: -12rem;
  background-color: #fff;
  .head {
    height: 10vh;
    // border-bottom: 1px solid red;
    line-height: 10vh;
    padding: 0 1rem;
    .fa-chevron-down {
      font-size: 1.2rem;
    }
    .icon-19 {
      float: right;
      font-size: 1.2rem;
    }
  }
  main {
    width: 100%;
    height: 70vh;
    // border-bottom: 1px solid red;
    .main-top {
      display: flex;
      height: 40vh;
      img {
        margin: auto;
      }
    }
    .main-bottom {
      position: relative;
      height: 30vh;
      .main-bottonm-left {
        line-height: 30vh;
        padding-left: 10vw;
        font-size: 1.5rem;
        i {
          cursor: pointer;
        }
      }
      .main-bottonm-center {
        line-height: 2.5rem;
        text-align: center;
      }
    }
  }
  footer {
    width: 100%;
    height: 20vh;
    // border-bottom: 1px solid red;
    .process-bar {
      height: 10vh;
      //   border-bottom: 1px solid red;
    }
    .audio-btns {
      height: 10vh;
    }
  }
}
.fa-heart {
  color: rgb(206, 57, 57);
}
</style>