<template>
  <div class="outer">
    <div class="box">
      <div class="middle">
          <slot name="middle"></slot>
      </div>
      <div class="left">
          <slot name="left"></slot>
      </div>
      <div class="right">
          <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.box {
  overflow: hidden;
  padding: 0 3rem 0 5rem;
  border-bottom: 0.1rem solid rgba(179, 172, 172, 0.3);
  .middle {
    float: left;
    width: 100%;
    height: 4rem;
    position: relative;
    // background-color: lightgray;
  }
  .left {
    float: left;
    width: 5rem;
    height: 4rem;
    // background-color: antiquewhite;
    margin-left: -100%;
    position: relative;
    left: -5rem;
  }
  .right {
    float: left;
    width: 3rem;
    height: 4rem;
    // background-color: brown;
    margin-left: -3rem;
    position: relative;
    right: -3rem;
  }
}
.outer{
  width: 100vw;
  height: 4rem;

}
</style>