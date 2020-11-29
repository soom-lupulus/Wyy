<template>
  <div>
    <div class="outer">
      <div class="left">
        <span>{{playingsongcurrenttime | songfilter}}</span>
      </div>
      <div class="middle">
        <mt-progress
          :value="value"
          :bar-height="barHeight"
          class="bar"
        ></mt-progress>
      </div>
      <div class="right">
        <span>{{playingsongduration | songfilter}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  mounted() {
      
      
  },
  data() {
    return {
    //   value: this.playingsongcurrenttime,
      barHeight: 2,
    };
  },
  computed: {
      ...mapState(['playingsongduration', 'playingsongcurrenttime']),
      value(){
          return (this.playingsongcurrenttime / this.playingsongduration) * 100
      }
  },
};
</script>

<style lang="less" scoped>
.outer {
  height: 10vh;
  display: flex;
  .left {
    width: 10vw;
    text-align: center;
    display: flex;
    span{
        margin: auto;
    }
  }
  .middle {
    width: 80vw;
    margin: auto;
  }
  .right {
    width: 10vw;
    text-align: center;
    display: flex;
    span{
        margin: auto;
    }
  }
}
</style>