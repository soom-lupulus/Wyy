<template>
  <div id="app">
    <router-view/>
    <bottom-play @click.native='$router.push("/complete")' v-show="$route.path !== '/login'"/>
  </div>
</template>

<script>
import BottomPlay from './components/BottomPlay.vue'
export default {
  components: { BottomPlay },
  created() {
    // console.log(this.$route);
  },
}
</script>

<style lang="less">
</style>
