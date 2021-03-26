<template>
  <div>
    <!-- 背景图片 -->
    <div class="bgpic"></div>
    <!-- 遮罩层 -->
    <div class="cover"></div>
    <div class="logo"></div>
    <main>
      <form>
        <ygg-input type="number" :value="phone" @input="phone = $event" />
        <ygg-input type="password" v-model="pazzword">
          <span>密码</span>
        </ygg-input>
        <button @click.prevent="login" id="logbtn" class="mycenter">登录</button>
      </form>
    </main>
  </div>
</template>

<script>
import yggInput from "../myComponent/yggInput";
import { Toast } from "mint-ui";
export default {
  components: { yggInput },
  data() {
    return {
      phone: "",
      pazzword: "",
    };
  },
  mounted() {
  },
  methods: {
    //登录方法
    async login() {
      try {
        const { data: res } = await this.$http.get("/login/cellphone", {
          params: {
            phone: this.phone,
            password: this.pazzword,
            timestamp: new Date().getTime()
          },
        });
        if (res.code === 200 || res.code === 304) {
          console.log('我是res');
          console.log(res);
          window.sessionStorage.setItem('token', res.token)
          this.$router.replace("/main");
          Toast("登陆成功~");
          this.$store.dispatch('saveUserInfo', res);
        }else if(res.code === 502){
            Toast(res.msg)
        }
      } catch (error) {
          Toast("账号或密码错误~");
          console.log('我是error');
          console.log(error);
      }
    },
  },
  component: {
    yggInput,
  },
};
</script>

<style lang="less" scoped>
.bgpic {
  width: 100vw;
  height: 100vh;
  background-image: url("../../public/img/rain.jpg");
  background-size: cover;
  position: absolute;
  z-index: -1;
  // 设置图片模糊
  filter: blur(3px);
}
.cover {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
}
.logo{
  width: 5rem;
  height: 5rem;
  background-image: url('../assets/logo.png');
  background-size: cover;
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 25%;
}
main {
  width: 20rem;
  height: 25rem;
  border-radius: 3rem;
  background-color: rgba(226, 221, 221, 0.3);
  position: absolute;
  z-index: 9;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  form {
    position: absolute;
    z-index: 9;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    #logbtn {
      width: 10rem;
      height: 3rem;
      background-color: transparent;
      margin-top: 8rem;
      outline: none;
      color: rgba(22,23,21,0.75);
      font-family: '微软雅黑';
      font-size: 15px;
    }
  }
}
</style>