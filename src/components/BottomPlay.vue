<template>
  <div>
    <div class="outer">
      <div class="left">
        <!-- <p>{{playingsong.al.picUrl}}</p> -->
        <img :src= songavatar alt="">
      </div>
      <div class="middle">
        <div class="content">
          <p>{{ songname }}</p>
          <p>{{ singername}}</p>
        </div>
      </div>
      <div class="right">
        <div class="icon">
          <i class="fa fa-play-circle-o" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['playingsong']),
    ...mapGetters(['songname', 'singername', 'songavatar'])
  },
};
</script>

<style lang="less" scoped>
.outer {
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  border-top: 0.01rem solid rgba(218, 210, 210, 0.5);
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