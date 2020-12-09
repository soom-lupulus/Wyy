<template>
  <div>
    <div class="outer">
      <div class="wrapper" ref="wrapper">
        <ul>
          <li
            v-for="(item, index) in 'data' in dayrecommendsong
              ? dayrecommendsong.data.dailySongs
              : 0"
            :key="index"
            @click="changeMusic(item)"
          >
            <ygg-flex-3>
              <template v-slot:left>
                <div class="recommend-left">
                  <img
                    :src="`${item.al.picUrl}?param=50y50`"
                    @load="bs.refresh()"
                  />
                </div>
              </template>
              <template v-slot:middle>
                <div class="recommend-middle">
                  <p>{{ item.name }}</p>
                  <p>{{ item.ar[0].name }} - {{ item.name }}</p>
                </div>
              </template>
              <template v-slot:right>
                <div class="recommend-right">
                  <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                </div>
              </template>
            </ygg-flex-3>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//引入betterScroll
import BScroll from "@better-scroll/core";
import { mapState } from "vuex";
import yggFlex3 from "../myComponent/yggFlex3.vue";
export default {
  components: { yggFlex3 },
  created() {
    // console.log("haha");
    this.$store.dispatch("getDayRecommendSong");
  },
  mounted() {
    this.bs = new BScroll(this.$refs.wrapper, {
      click: true
    });
  },
  data() {
    return {
      bs: {},
    };
  },
  computed: {
    ...mapState(["dayrecommendsong"]),
  },
  methods: {
    changeMusic(item){
      // console.log('haha');
      this.$store.dispatch('getMusicUsable', item.id)
      this.$store.dispatch('getPlayingSongUrl', item.id)
      //保存正在播放（选中）的歌曲
      this.$store.dispatch("savePlayingSong", item);
      //改变播放按钮状态
      this.$store.dispatch('toggleBtnState', false)
    }
  },
};
</script>

<style lang="less" scoped>
.outer {
  // position: absolute;
  // top: 7rem;
  .wrapper {
    height: 75vh;
    overflow: hidden;
    // background-color: aquamarine;
    .recommend-middle {
      width: 100%;
      p {
        font-size: 0.5em;
        &:first-child {
          font-size: 0.8em;
        }
        &:last-child {
          padding-top: 5px;
          color: rgb(177, 173, 173);
        }
      }
    }
  }
}
</style>