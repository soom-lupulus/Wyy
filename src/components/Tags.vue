<template>
  <div>
    <div class="wrapper">
      <span @click="tagMy" class="underline" ref="tag1">我的</span>
      <span @click="tagRecommend" ref="tag2">每日推荐</span>
      <span @click="tag1" ref="tag3">没开发</span>
      <span @click="tag2" ref="tag4">没开发</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    spans() {
      return document.querySelectorAll(".wrapper span");
    },
  },
  methods: {
    tagMy() {
      this.clearClass();
      this.addUnderline(this.$refs.tag1);
      this.$router.push("/main/mine");
    },
    tagRecommend() {
      this.clearClass();
      this.addUnderline(this.$refs.tag2);
      this.$router.push("/main/recommend");
    },
    tag1() {},
    tag2() {},
    //清除所有的样式
    clearClass() {
      for (const s of this.spans) {
        s.classList.remove("underline");
      }
    },
    //加上下划线样式
    addUnderline(tag) {
      this.clearClass();
      tag.classList.add("underline");
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  width: 100%;
  display: flex;
  // position: fixed;
  // top: 4rem;
  // z-index: 999;
  background-color: #fff;
  span {
    flex: 1;
    text-align: center;
    line-height: 2.5rem;
    font-family: "幼圆";
  }
}
.underline {
  border-bottom: 0.2em solid black;
}
</style>