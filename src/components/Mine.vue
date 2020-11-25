<template>
  <div>
    <!-- 个人信息栏 -->
    <ygg-flex3>
      <template v-slot:left>
        <img :src= avatarUrl  alt="" id="headsculpture "/>
      </template>
      <template v-slot:middle>
        <p>{{userinfo.profile.nickname}}</p>
        <p>我的生日：{{userinfo.profile.birthday | datrfmt}}</p>
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
  </div>
</template>

<script>
import {mapState} from 'vuex'
import yggFlex3 from "../myComponent/yggFlex3";
import YggFlex1 from "../myComponent/yggFlex1";
export default {
  components: {
    yggFlex3,
    YggFlex1
  },
  computed: {
      ...mapState(['userinfo'])
  },
  data() {
      return {
          avatarUrl: `${this.$store.state.userinfo.profile.avatarUrl}?param=50y50`
      }
  },
};
</script>

<style lang="less" scoped>
.icon{
    width: 2.5rem;
    height: 2.5rem;
    border: 0.1rem solid rgb(0, 0, 0);
    font-size: 1.5rem;
    text-align: center;
    line-height: 2.5rem;
}
#headsculpture{
    display: block;
    width: 3rem;
    height: 3rem;
}
</style>