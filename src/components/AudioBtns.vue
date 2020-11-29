<template>
  <div class="wrapper">
    <div class="outer">
      <i class="fa fa-random" aria-hidden="true"></i>
      <i class="fa fa-step-backward" aria-hidden="true"></i>
      <div class="playbtns">
        <i class="fa fa-play-circle-o" aria-hidden="true" @click="goPlay" v-show="playingbuttonstate"></i>
        <i class="fa fa-pause-circle-o" aria-hidden="true" v-show="!playingbuttonstate" @click="goPlay"></i>
      </div>
      <i class="fa fa-step-forward" aria-hidden="true"></i>
      <i class="fa fa-list-ol" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      isshow: false
    }
  },
  computed: {
    ...mapState(['playingbuttonstate'])
  },
  methods: {
    goPlay() {
      this.$store.dispatch('toggleBtnState')
      
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: 100%;
  .outer {
    height: 100%;
    display: flex;
    text-align: center;
    i {
      display: block;
      flex: 1;
      margin: auto;
      font-size: 1.5rem;
    }
    .fa-play-circle-o, .fa-pause-circle-o{
      font-size: 4rem;
    }
  }
}
</style>