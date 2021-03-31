<template>
  <div>
    <transition
      enter-active-class="animate__animated animate__backInUp"
      leave-active-class="animate__animated animate__backOutDown"
    >
      <div class="outer" ref="myself">
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
            <audio-btns v-on:show-it="show_list = true"/>
          </div>
        </footer>
      </div>
    </transition>
    <!-- 播放列表 -->
    <play-list :show_list.sync= show_list />
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { mapGetters, mapState } from "vuex";
import processBar from "./ProcessBar";
import audioBtns from "./AudioBtns";
import PlayList from './PlayList.vue';
export default {
  props: {
    isshow: Boolean,
  },
  components: {
    processBar,
    audioBtns,
    PlayList,
  },
  mounted() {
    this.watchLoveState();
    
  },
  data() {
    return {
      likedyet: false,
      show_list: false
    };
  },
  computed: {
    ...mapState(["playingsong", "userlikedsongsids"]),
    ...mapGetters(["songpic", "songname", "singername"]),
  },
  watch: {
    //监视判断正在播放的歌曲是不是喜欢的歌曲
    playingsong() {
      this.watchLoveState();
    },
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log(to, from);
    next();
  },
  methods: {
    goDown() {
      console.log('haha');  
      this.$router.push('/main');
      
    },
    async toggleLikeState() {
      //切换状态
      this.likedyet = !this.likedyet;
      const { id } = this.playingsong;
      // console.log("我是" + this.likedyet);
      const { data: res } = await this.$http.get("/like", {
        params: {
          id,
          like: this.likedyet,
        },
      });
      if (res.code === 200) {
        this.$refs.heart.classList.remove("fa-heart", "fa-heart-o");
        if (this.likedyet) {
          this.$refs.heart.classList.add("fa-heart");
          Toast("喜欢成功~");
        } else {
          this.$refs.heart.classList.add("fa-heart-o");
          Toast("取消成功~");
        }
      } else {
        Toast("操作失败~");
      }
    },
    //监听喜欢
    watchLoveState() {
      const { id } = this.playingsong;
      // console.log(id);
      this.likedyet = this.userlikedsongsids.some((item) => {
        return item === id;
      });
      // console.log(this.likedyet);
      // 删除所有类名
      this.$nextTick(() => {
        this.$refs.heart.classList.remove("fa-heart", "fa-heart-o");
        if (this.likedyet) {
          this.$refs.heart.classList.add("fa-heart");
        } else {
          this.$refs.heart.classList.add("fa-heart-o");
        }
      });
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
  z-index: 9;
  background-color: rgb(255, 255, 255);
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