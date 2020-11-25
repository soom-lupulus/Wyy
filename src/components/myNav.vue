<template>
  <div>
    <yggNav3 class="head">
      <template v-slot:left>
        <div id="musicName">网易鱼</div>
      </template>
      <template v-slot:middle>
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
        <i class="fa fa-bars" aria-hidden="true"></i>
      </template>
    </yggNav3>
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
      this.$store.dispatch("getSearchedMusic", searchValue)
      this.$emit("gotoSearch");
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
.head{
  position: fixed;
}
</style>
