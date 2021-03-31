<template>
  <div>
    <div class="title">
      <p></p>
    </div>
    <div class="mysonglistwrapper" ref="mysonglistwrapper">
      <ul>
        <li v-for="(item, index) in mycreatedsonglist" :key="index" @click="showListInfo(item)">
          <ygg-flex-3 >
            <template v-slot:left>
              <!--  -->
              <img :src="item.coverImgUrl | imgfilter" @load="bs.refresh()" />
            </template>
            <template v-slot:middle>
              <div class="middle-outer">
                <p>{{ item.name }}</p>
                <p>{{ item.trackCount }}首</p>
              </div>
            </template>
            <template v-slot:right>
              <div class="right-outer">
                <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
              </div>
            </template>
          </ygg-flex-3>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import yggFlex3 from "../myComponent/yggFlex3.vue";
import BScroll from "@better-scroll/core";
export default {
  components: { yggFlex3},
  data() {
    return {
      bs: {},
    };
  },
  computed: {
    ...mapState(["usersonglist"]),
    ...mapGetters(["mycreatedsonglist"]),
  },
  mounted() {
    this.$nextTick(() => {
      this.bs = new BScroll(this.$refs.mysonglistwrapper, {
        click: true
      });
    });
  },
  methods: {
    showListInfo(item){
      this.$router.push('/mysonglist/' + item.id)
    }
  },
  updated() {
    this.bs.refresh()
  },
};
</script>

<style lang="less" scoped>
.mysonglistwrapper {
  height: 65vh;
  //   background-color: antiquewhite;
  overflow: hidden;
}
.middle-outer {
  width: 100%;
  p {
    font-size: 0.5em;
  }
}
.right-outer {
  i {
    font-size: 1.2em;
    color: rgb(104, 102, 102);
  }
}
.title {
  p {
    font-size: 1em;
    font-family: '楷体';
    padding: 0.2rem 1rem;
    text-shadow: 5px;
  }
}
.outer-outer {
  // position: sticky;
  // top: 0;
}
</style>