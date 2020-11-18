<template>
  <div class="box">
    <div class="regist-index">
      <div class="form">
        <div class="login-user">
          <span class="title">用户注册</span>
          <el-form :label-position="labelPosition" :model="loginForm" ref="loginForm" label-width="80px"
                   :hide-required-asterisk="true">
            <el-form-item
              width="100px"
              class="el-item"
              label="用户名"
              prop="user"
              :rules="[
      { required: true, message: '用户名不能为空'}
    ]"
            >
              <el-input type="age" v-model="loginForm.user" autocomplete="off" placeholder="6-16位英文或数字"></el-input>
            </el-form-item>
            <el-form-item
              width="100px"
              class="el-item"
              label="登录密码"
              prop="password"
              :rules="[
      { required: true, message: '登录密码不能为空'}
    ]"
            >
              <el-input type="password" v-model.number="loginForm.password" autocomplete="off"
                        placeholder="6-16位英文或数字"></el-input>
            </el-form-item>
            <el-form-item
              width="100px"
              class="el-item"
              label="手机号"
              prop="phone"
              :rules="[
      { required: true, message: '手机号不能为空'}
    ]"
            >
              <el-input type="text" v-model.number="loginForm.phone" maxlength="11" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item
              width="100px"
              class="el-item"
              label=""
              prop="code"
              :rules="[
      { required: true, message: '验证码不能为空'}
    ]"
            >
              <div class="valid-wrap">
                <el-input type="text" v-model.number="loginForm.code" autocomplete="off"></el-input>
                <el-button type="primary" class="send" @click="sendMsg(true)" size="small" :disabled="beginCountdown" round>{{codeMsg}}</el-button>
              </div>
            </el-form-item>
            <el-form-item class="el-item">
              <el-button element-loading-background="rgba(122, 123, 125, 0.5)" type="primary" class="login-btn"
                         @click="submitForm('loginForm')" v-loading.fullscreen.lock="fullscreenLoading" >注册
              </el-button>
            </el-form-item>
          </el-form>

        </div>

        <div class="tips">
          <div class="left">
            <span>已有账号？</span>
            <a href="javascript:;" class="regist" @click="toLogin">前往登录</a>
          </div>
        </div>
      </div>

    </div>
    <v-code :show="isShow" @success="onSuccess"></v-code>
    <div>{{msg}}</div>
  </div>

</template>

<script>
  import * as  sendCode  from "@/common";
  export default {
    name: 'regit',
    data () {
      return {
        labelPosition: 'top',
        fullscreenLoading: false,
        loginForm: {
          user: '',
          password: '',
          phone: '',
          code: ''
        },
        msg: '',
        isShow: false,
        codeMsg: '获取验证码',
        beginCountdown:false
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.fullscreenLoading = true
            setTimeout(() => {
              this.fullscreenLoading = false
              this.isShow = true
            }, 1000)
            // alert('submit!')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      onSuccess () {
        this.isShow = false
        sendCode.Countdown(this)
      },
      onFail () {
        this.msg = ''
      },
      onRefresh () {
        this.msg = ''
      },
      toLogin () {
        this.$router.push('login')
      },
      sendMsg (flag) {
        if(this.loginForm.phone){
          if(flag){
            this.isShow = true
          }else{
            sendCode.Countdown(this)
          }
        }else{
          this.$message.error("请填写手机号")
        }

      }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    .regist-index {
      background: #f2f5f9;
      align-items: center !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      display: flex;
      justify-content: center;
      align-items: center;

      .form {
        width: 380px;

        .login-user {
          background: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
          padding: 30px 20px;

          .title {
            font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, Arial, sans-serif;
            color: #082155;
            font-weight: 500;
            font-size: 20px;
            display: inline-block;
            margin-bottom: 30px;
            text-align: center;
            width: 100%;
          }

          .login-btn {
            width: 100%;
            margin-top: 20px;
            position: relative;
            transition:top .3s;
            &:hover{
              top:-5px;
            }
          }
        }

        .tips {
          display: flex;
          justify-content: space-between;
          padding: 20px 0;

          a {
            color: rgba(0, 32, 89, .4);
            font-size: 15px;
            text-decoration: none;
          }

          a:hover {
            color: rgba(0, 32, 89, .8) !important;
            transition: all .2s !important;
            cursor: pointer !important;
          }

          .left {
            color: rgba(0, 32, 89, .4);
            font-size: 15px;

          }
        }


      }
    }
  }


</style>
<style lang="scss">
  .el-item {
    .valid-wrap {
      display: flex;
      .send {
        margin-left: 19px;
      }
    }
    .el-form-item__label {
      color: #082155 !important;
      font-size: 16px !important;
      box-sizing: border-box !important;
      font-family: PingFang SC, Helvetica Neue, Helvetica, Hiragino Sans GB, Microsoft YaHei, \\5FAE\8F6F\96C5\9ED1, Arial, sans-serif !important;
    }
  }

  .el-loading-parent--relative {
    position: initial !important;
  }
</style>
