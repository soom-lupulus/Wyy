<template>
  <div>
    <yggNav3 class="head">
      <template v-slot:left>
        <div id="musicName" @click="goBack">网易鱼</div>
      </template>
      <template v-slot:middle id="middle-outer">
        <mt-search
          class="searchinput"
          v-model="searchValue"
          cancel-text="取消"
          placeholder=" 搜索"
          @keyup.enter.native="goSearch()"
        >
        </mt-search>
      </template>
      <template v-slot:right>
        <i class="fa fa-bars" aria-hidden="true" @click="drawer = true"></i>
      </template>
    </yggNav3>
    <!-- 侧边栏 -->
    <!-- 抽屉 -->
    <el-drawer
      title="我是侧边栏~"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <span>功能尚未开发!</span>
    </el-drawer>
  </div>
</template>

<script>
import yggNav3 from "../myComponent/yggNav3";
import { mapGetters } from "vuex";
export default {
  components: {
    yggNav3,
  },
  data() {
    return {
      searchValue: "",
      direction: "rtl",
      drawer: false,
    };
  },
  computed: {
    ...mapGetters(["searchedSongsIds"]),
  },
  methods: {
    //搜索歌曲
    goSearch() {
      const { searchValue } = this;
      //获取所有的歌曲信息(id)
      this.$store.dispatch("getSearchedMusic", searchValue);
      this.$emit("gotoSearch");
    },
    //
    goBack() {
      this.$emit("goBackMain");
    },
    //点击关闭侧边栏
    handleClose(done) {
      done()
    },
  },
};
</script>


<style lang="less" scoped>
#musicName {
  width: 100%;
  height: 100%;
  color: #000000;
  line-height: 4rem;
  text-align: center;
  font-family: "华文新魏";
  font-size: 1.5rem;
}

.searchinput /deep/ .mint-searchbar {
  background-color: transparent;
  margin: auto;
}
.searchinput /deep/ .mint-searchbar-inner {
  border: 1px solid rgb(207, 197, 197);
}
.fa-bars {
  display: block;
  font-size: 1.5rem;
  line-height: 4rem;
  text-align: center;
}
.head {
  position: fixed;
  // z-index: 999;
  background-color: #fff;
}

.mint-search {
  display: flex;
  // background-color: antiquewhite;
  height: 4rem;
}
</style>
