<template>
  <div id="app">
    <router-view/>
    <bottom-play @click.native='$router.push("/complete")' v-show="$route.path !== '/login'"/>
  </div>
</template>

<script>
import BottomPlay from './components/BottomPlay.vue'
import {mapState} from 'vuex'
export default {
  components: { BottomPlay },
  created() {
    // v-show="$route.path !== '/login'"
  },
  computed: {
    ...mapState(['playinglist'])
  }
}
</script>

<style lang="less">
</style>
