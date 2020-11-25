<template>
  <div>
      <div class="outer">
          <div class="left">
              <slot name="left"></slot>
          </div>
          <div class="middle">
              <slot name="middle"></slot>
          </div>
          <div class="right">
              <slot name="right"></slot>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.outer{
    width: 100%;
    height: 4rem;
    display: flex;
    .left{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .middle{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .right{
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>