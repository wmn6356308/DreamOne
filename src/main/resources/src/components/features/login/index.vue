<template>
  <div class="login-container">
    <canvas ref="cas"></canvas>
    <div class="login_box center">
      <el-tabs v-model="activeName" @tab-click="handleTabClick" :stretch="true">
        <el-tab-pane label="密码登录" name="psw">
          <div class="psw-container">
            <div class="input_box">
              <el-input placeholder="请输入用户名/手机号" v-model="userName" class="login_el"></el-input>
              <el-input
                placeholder="请输入密码"
                v-model="userPsw"
                type="password"
                class="login_el"
                @keydown.enter.native="loginHandler"
              ></el-input>
              <div class="login_el">
                <img src="../../../assets/images/login_bg.jpeg" width="200" />
              </div>
              <el-input class="verification-code login_el" v-model="pswCode">
                <template slot="prepend">请输入验证码</template>
              </el-input>
            </div>
            <el-button type="primary" @click="loginHandler">登录</el-button>
            <div class="login_el">
              <a @click="forgotPsw">忘记密码</a>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="手机验证码登录" name="phone">
          <div class="code-container">
            <el-input placeholder="手机号" v-model="phone" class="login_el"></el-input>
            <div class="login_el code">
              <div class="code-input">
                <el-input v-model="code"></el-input>
              </div>
              <div class="send-code">
                <el-button type="primary" @click="sendCode" :disabled="showRemainingTimeMsg">发送验证码</el-button>
                <span class="code-warning" v-if="showRemainingTimeMsg">{{remainingTimeMsg}}</span>
              </div>
            </div>
            <el-button type="primary" @click="loginHandler">登录</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import Raining from "@/utils/raining";
import Loading from "@/utils/loading";
import {
  sessionStorageGet,
  sessionStorageSet,
  sessionStorageRemove
} from "@/utils/index";

export default {
  name: "login",
  data() {
    return {
      userName: "",
      userPsw: "",
      pswCode: "",
      activeName: "psw",
      code: "",
      phone: "",
      showRemainingTimeMsg: false,
      remainingTimeMsg: ""
    };
  },
  created() {
    if (sessionStorageGet("userInfo")) this.$router.push("/home");
  },
  mounted() {
    Raining.init(this.$refs.cas);
  },
  beforeDestroy() {
    Raining.stop();
  },
  methods: {
    sendCode() {
      this.showRemainingTimeMsg = true;
      let sendCodePeriod = 60;

      const updateRemainingTimer = setInterval(() => {
        this.updateRemainingTimeMsg(--sendCodePeriod, updateRemainingTimer);
      }, 1000);

      this.updateRemainingTimeMsg(sendCodePeriod, updateRemainingTimer);
    },
    forgotPsw() {
      this.$router.push("/forgotPsw");
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    loginHandler() {
      if (this.activeName === "psw") {
        if (!this.userName)
          return this.$msg({
            message: "请输入用户名",
            type: "warning"
          });
        if (!this.userPsw)
          return this.$msg({
            message: "请输入密码",
            type: "warning"
          });
        if (this.pswCode !== "54321")
          return this.$msg({
            message: "请根据上去填写对应的验证码",
            type: "warning"
          });
      } else if (this.activeName === "phone") {
        if (!this.phone)
          return this.$msg({
            message: "请输入手机号",
            type: "warning"
          });
        if (this.code !== "12345")
          return this.$msg({
            message: "验证码错误",
            type: "warning"
          });
      }

      let params = {
        userName: this.userName,
        userPsw: this.userPsw
      };

      // use HTTP instead of timeout for real ENV.
      const loading = new Loading();
      loading.open();

      setTimeout(() => {
        loading.close();

        sessionStorageSet("userInfo", {
          userInfo: { userName: this.userName },
          timestamp: Date.now()
        });
        this.$store.commit("setUserInfo", {
          userInfo: { userName: this.userName }
        });

        const ERROR_MESSAGE = sessionStorageGet("ERROR_MESSAGE");
        if (ERROR_MESSAGE == "TIMEOUT" || ERROR_MESSAGE == "NOLOGIN") {
          sessionStorageRemove("ERROR_MESSAGE");
          this.$router.go(-1);
        } else {
          this.$router.push("/home");
        }
      }, 3000);
    },
    updateRemainingTimeMsg(RemainingTime, updateRemainingTimer) {
      if (RemainingTime === 0) {
        this.showRemainingTimeMsg = false;
        clearInterval(updateRemainingTimer);
      }

      this.remainingTimeMsg = `${RemainingTime}s后可以重新发送`;
    }
  }
};
</script>
<style lang="less" scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: url("../../../assets/images/login_bg.jpeg") no-repeat center
    center;
  position: relative;

  .login_box {
    width: 600px;
    background: rgba(200, 200, 200, 0.3);
    position: absolute;

    .psw-container,
    .code-container {
      padding: 20px;
      .input_box {
        margin-bottom: 25px;
      }
    }

    .verification-code {
      width: 400px;
    }
  }

  .code {
    display: flex;

    .code-input {
      margin-right: 20px;
    }

    .code-warning {
      color: red;
    }
  }
}
</style>
