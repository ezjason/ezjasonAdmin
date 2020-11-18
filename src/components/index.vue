<template>
  <div class="index">
    <el-container>
      <el-header :style="{ 'background-color': color }" style="display: flex;justify-content: space-between;align-items: center;">
        <div class="icon-header">
          <span style="color: #fff;font-size: 30px;font-weight: 800;">ezjason</span>
          <el-button icon="el-icon-s-operation"  type="text" @click="isCollapse=!isCollapse;" style="float: left;"></el-button>
        </div>
        <div class="icon-header-right">
          <v-color></v-color>
        </div>
      </el-header>
      <el-container>
        <el-aside :class="isCollapse?'hide-side':'show-side'">
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                   :collapse="isCollapse">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>
              </template>
              <el-menu-item-group>
                <span slot="title">分组一</span>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <span slot="title">选项4</span>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" >
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>Main</el-main>
          <el-footer :style="{ 'background-color': color }">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import vueWxLogin from 'vue-wxlogin'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        redirect_uri: encodeURI('www.baidu.com'),
        style: 'black',
        appid: 'wx6defee78b0aec779',
        scope: 'snsapi_userinfo',
        state: 'bind',
        isCollapse: false,
        width: 200,
        menu:[{
          label:"导航一"
        },{
          label:"导航二"
        },{
          label:"导航三"
        },{
          label:"导航四"
        }]
      }
    },
    computed:{
      color(){
        return this.$store.state.base.color
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      }
    },
    components: {
      vueWxLogin
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header, .el-footer {
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    /*background-color: #E9EEF3;*/
    color: #333;
    /*text-align: center;*/
    /*line-height: 200px;*/
    min-height: 860px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 860px;
  }

  .icon-header {
    width: 180px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon-header-right{
    width:200px;
    height: 60px;
    display: flex;
    justify-content: right;
    align-items: center;
  }
  .hide-side{
    width:65px !important;
    transition: width .5s;
  }
  .show-side{
    width:200px !important;
    transition: width .1s;
  }
</style>
