<template>
  <div class="outer" ref="outer">
    <ul v-if="searchedmusic">
      <li
        @click="songClick(item)"
        v-for="(item, index) in searchedmusic"
        :key="index"
      >
        <div class="left">
          <p>{{ item.name }}</p>
          <p>{{ item.ar[0].name }}</p>
        </div>
        <div class="right">
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入betterScroll
import BScroll from "@better-scroll/core";
export default {
  computed: {
    ...mapState([
      "searchedmusic",
      "searchedmusicusable",
      "playinglist",
      "playingsong",
    ]),
  },
  data() {
    return {};
  },
  mounted() {},
  watch: {
    searchedmusic(val) {
      // console.log("改变了");
      this.$nextTick(() => {
        let outer = this.$refs.outer;
        let bs = new BScroll(outer, {
          scrollY: true,
          click: true,
          startY: 40,
        });
      });
    },
  },
  methods: {
    songClick(item) {
      //根据id获取歌曲可用性
      const { id } = item;
      // console.log(id);
      //判断id是否有用
      this.$store.dispatch("getMusicUsable", id).then((_) => {
        if (this.searchedmusicusable.success) {
          this.$store.dispatch("getPlayingSongUrl", id);
        }
      });
      //保存正在播放（选中）的歌曲
      this.$store.dispatch("savePlayingSong", item);
      //改变播放按钮状态
      this.$store.dispatch("toggleBtnState", false);
      //更新播放列表
      this.updatePlayingList();
    },
    updatePlayingList() {
      const { commit } = this.$store;
      commit("playing_list");
      commit("playing_list_index");
      // console.log(this.$store.state.playing_list_index);
    },
  },
};
</script>

<style lang="less" scoped>
.outer {
  height: ~"calc(100vh - 8rem)";
  overflow: hidden;
  ul {
    //   background-color: rgb(23, 245, 245);
    li {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0 0.5rem 1rem;
      .left {
        p {
          &:first-child {
          }
          &:last-child {
          }
        }
      }
      .right {
        padding-right: 1rem;
        font-size: 1.2rem;
        color: rgba(0, 0, 0, 0.5);
        text-align: center;
      }
    }
  }
}
</style>