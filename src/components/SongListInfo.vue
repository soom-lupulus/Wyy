<template>
  <div>
    <div class="outer" v-if="songlistInfo.playlist">
      <div class="head">
        <!-- 头部导航栏 -->
        <div class="head-nav">
          <div class="nav-left">
            <i
              class="fa fa-long-arrow-left"
              aria-hidden="true"
              @click="$router.push({ path: '/main/mine'})"
            ></i>
            <span>歌单</span>
          </div>
          <div class="nav-right"></div>
        </div>
        <!-- 中间歌单信息 -->
        <div class="main">
          <div class="main-left">
            <img
              :src="
                songlistInfo.playlist
                  ? `${songlistInfo.playlist.coverImgUrl}?param=150y150`
                  : ''
              "
              alt=""
            />
          </div>
          <div class="main-right">
            <p>{{ songlistInfo.playlist ? songlistInfo.playlist.name : "" }}</p>
            <p>0.0</p>
          </div>
        </div>
      </div>
      <footer>
        <!-- <div id="stick">我也不知道是啥</div> -->
        <ul>
          <li
            v-for="(item, index) in songlistInfo.playlist.tracks"
            :key="index"
            @click="eachSongClick(item)"
          >
            <div class="li-outer">
              <div class="li-left">{{ index + 1 }}</div>
              <div class="li-middle">
                <p>{{ item.name }}</p>
                <p>
                  {{
                    `${item.ar[0].name}${
                      item.ar[1] ? "/" + item.ar[1].name : ""
                    } - ${item.al.name}`
                  }}
                </p>
              </div>
              <div class="li-right"></div>
            </div>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["songlistid"],
  created() {
    let p1 = this.$store.dispatch("getsonglistinfo", this.songlistid);
    p1.then((val) => {
      const { commit } = this.$store;
      commit("playing_list", {
        flag: true,
        arr:  this.songlistInfo.playlist.tracks
      });
      // commit("playing_list_index", 1);
    });
  },
  computed: {
    ...mapState(["songlistInfo"]),
  },
  methods: {
    eachSongClick(item) {
      // console.log('我嗲了');
      this.$store.dispatch("savePlayingSong", item);
      this.$store.dispatch("getPlayingSongUrl", item.id);
      // 改变按钮状态
      this.$store.dispatch("toggleBtnState", false);
      //修改播放列表Index
      const cur_index = this.songlistInfo.playlist.tracks.indexOf(item)
      this.$store.commit('playing_list_index', {
        type: true,
        val: cur_index
      })
    },
  },
};
</script>

<style lang="less" scoped>
.outer {
  .head {
    width: 100%;
    height: 30vh;
    position: relative;
    // background-color: antiquewhite;
    // z-index: -1;
    overflow: hidden;
    &:after {
      content: "";
      width: 140%;
      height: 30vh;
      position: absolute;
      left: -20%;
      top: 0;
      z-index: -1;
      border-radius: 0 0 50% 50%;
      background: linear-gradient(
        180deg,
        rgb(172, 168, 171),
        rgb(247, 247, 238)
      );
    }
    .head-nav {
      height: 10vh;
      display: flex;
      .nav-left {
        i {
          padding: 0 1rem;
          font-size: 1.5em;
          color: rgb(238, 235, 235);
          vertical-align: -webkit-baseline-middle;
        }
        span {
          color: rgb(241, 236, 236);
          vertical-align: -webkit-baseline-middle;
        }
      }
    }
  }
  .main {
    display: flex;
    .main-left {
      width: 40vw;
      img {
        width: 25vw;
        padding: 0 1rem;
        border-radius: 1.2rem;
      }
    }
    .main-right {
      width: 60vw;
      margin-left: 1rem;
    }
  }
  footer {
    #stick {
      position: sticky;
      top: 0;
      background-color: rgb(243, 240, 242);
      line-height: 2.5rem;
    }
    ul {
      li {
        padding: 1rem 0;
        .li-outer {
          display: flex;
          .li-left {
            width: 10vw;
            text-align: center;
            line-height: 2.5rem;
            color: rgb(148, 148, 148);
          }
          .li-middle {
            width: 80vw;
            p {
              &:first-child{
                font-family: Helvetica, sans-serif, STHeiTi;
              }
              &:last-child {
                font-size: 0.8em;
                color: rgb(190, 190, 190);
              }
            }
          }
          .li-right {
            width: 10vw;
          }
        }
      }
    }
  }
}
</style>