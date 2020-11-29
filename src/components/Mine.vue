<template>
  <div class="no">
    <!-- 个人信息栏 -->
    <ygg-flex3>
      <template v-slot:left>
        <img :src="avatarUrl" alt="" id="headsculpture " />
      </template>
      <template v-slot:middle>
        <p>{{ nickname }}</p>
        <p>我的生日：{{ userinfo.profile.birthday | datrfmt }}</p>
      </template>
    </ygg-flex3>
    <!-- 喜欢，最近 -->
    <ygg-flex1 class="categroy">
      <template v-slot:left>
        <div class="icon">
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
      </template>
      <template v-slot:middle>
        <div class="icon">
          <i class="fa fa-star" aria-hidden="true"></i>
        </div>
      </template>
      <template v-slot:right>
        <div class="icon">
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
        </div>
      </template>
    </ygg-flex1>
    <!-- 我的歌单 -->
    <my-song-list/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import yggFlex3 from "../myComponent/yggFlex3";
import YggFlex1 from "../myComponent/yggFlex1";
import MySongList from './MySongList.vue';
export default {
  components: {
    yggFlex3,
    YggFlex1,
    MySongList,
  },
  computed: {
    ...mapState(["userinfo"]),
    //裁剪用户昵称
    nickname() {
      if (this.userinfo.profile.nickname.length > 12) {
        const str = this.userinfo.profile.nickname.slice(0, 12);
        return str + "...";
      } else {
        return this.userinfo.profile.nickname;
      }
    },
  },
  data() {
    return {
      avatarUrl: `${this.$store.state.userinfo.profile.avatarUrl}?param=50y50`,
    };
  },
};
</script>

<style lang="less" scoped>
.icon {
  width: 2.5rem;
  height: 2.5rem;
  border: 0.1rem solid rgb(0, 0, 0);
  font-size: 1.5rem;
  text-align: center;
  line-height: 2.5rem;
}
#headsculpture {
  display: block;
  width: 3rem;
  height: 3rem;
}
.no{
  width: 100%;
  // position: absolute;
  // z-index: 1;
  // top: 7rem;
}
</style>