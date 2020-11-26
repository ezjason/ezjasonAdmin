<template>
  <div class="index">
    <el-container>
      <el-header :style="{ 'background-color': color }"
                 style="display: flex;justify-content: space-between;align-items: center;">
        <div class="icon-header">
          <span style="color: #fff;font-size: 30px;font-weight: 800;">{{$store.state.base.name}}</span>
          <el-button icon="el-icon-s-operation" type="text" @click="isCollapse=!isCollapse;"
                     style="float: left;"></el-button>
        </div>
        <div class="icon-header-right">
          <v-color></v-color>
          <el-image
            style="width: 40px; height: 33px;"
            :src="url" :fit="'fill'"
            :preview-src-list="srcList"></el-image>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :background-color="color"
                   text-color="#fff" active-text-color="#fff" @select="handleSelect">
            <el-submenu index="1">
              <template slot="title"> {{$store.state.base.name}}</template>
              <el-menu-item index="1">个人资料</el-menu-item>
              <el-menu-item index="2">修改密码</el-menu-item>
              <el-menu-item index="3">退出登录</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-header>
      <el-container>
        <el-aside :class="isCollapse?'hide-side':'show-side'">
          <el-menu :default-active="`${menu[0].children?'0-0':'0'}`" class="el-menu-vertical-demo" @open="handleOpen"
                   @close="handleClose"
                   :collapse="isCollapse" unique-opened>
            <el-submenu
              v-for="(item,key) in menu" :index="key.toString()" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="`${key.toString()}-${ind}`" v-for="(i,ind) in item.children" @click="link(i)">
                  {{i.label}}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-for="(item,key) in menu.filter(i=>!i.children)" :index="key.toString()" @click="link(item)"
                          v-else>
              <i class="el-icon-setting"></i>
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <div class="breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(i,index) in breadcrumb"><router-link :to="i.href">{{i.name}}</router-link>
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <router-view></router-view>
          </el-main>
          <el-footer :style="{ 'background-color': color }">{{$store.state.base.name}}</el-footer>
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
        activeIndex: null
      }
    },
    computed: {
      color () {
        return this.$store.state.base.color
      },
      url () {
        return this.$store.state.base.imageURL
      },
      srcList () {
        return this.$store.state.base.srcList
      },
      menu () {
        return this.$store.state.base.menu
      },
      breadcrumb () {
        return this.$store.state.base.breadcrumb
      }
    },
    mounted () {
      this.update(this.menu[0])
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleSelect (val) {
        switch (val * 1) {
          case 1:
            // 个人资料
            console.log('个人资料')
            this.$router.push({
              path: '/setting'
            })
            this.$store.commit('changeBreadcrumb', [{
              name: '个人资料',
              href: '/setting'
            }])
            break
          case 2:
            // 修改密码
            console.log('密码')
            this.$router.push({
              path: '/password'
            })
            this.$store.commit('changeBreadcrumb', [{
              name: '修改密码',
              href: '/password'
            }])
            break
          case 3:
            // 登出
            console.log('登出')
            this.loginOut()
            break
          default:
            console.log('默认')
        }
      },
      link (item) {
        if (item.parentId === -1 && item.href) {
          let indexObj = {
            name: item.label,
            href: item.href ? item.href : '/'
          }
          this.$store.commit('changeBreadcrumb', [indexObj])
        } else {
          let data = this.menu.filter(i => i.id === item.parentId)[0]
          let arr = []
          let obj = {
            name: data.label,
            href: data.href ? item.href : '/'
          }
          arr.push(obj)
          arr.push({
            name: item.label,
            href: item.href ? item.href : '/'
          })
          this.$store.commit('changeBreadcrumb', arr)
        }
        this.$router.push({
          path: item.href
        })
        console.log(this.$route)
      },
      update (item, obj = {}) {
        // 初始化菜单
        if (item.children) {
          let newObj = {
            name: item.label,
            href: item.href ? item.href : '/'
          }
          this.update(item.children[0], newObj)
        } else {
          if (obj) {
            let arr = []
            arr.push(obj)
            arr.push({
              name: item.label,
              href: item.href ? item.href : '/'
            })
            console.log(arr)
            this.$store.commit('changeBreadcrumb', arr)
          } else {
            let indexObj = {
              name: item.label,
              href: item.href ? item.href : '/'
            }
            this.$store.commit('changeBreadcrumb', [indexObj])
          }
          this.$router.push({
            path: item.href
          })
        }

      },
  // 登出
      loginOut(){
        this.$alert('确定退出登录？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
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
    /*line-height: 160px;*/
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

  .icon-header-right {
    width: 200px;
    height: 60px;
    display: flex;
    justify-content: right;
    align-items: center;
  }

  .hide-side {
    width: 65px !important;
    transition: width .5s;
  }

  .show-side {
    width: 200px !important;
    transition: width .5s;
  }

  .el-image {
    border-radius: 50%;
    margin-left: 10px;
    margin-right: 10px;
  }

  .breadcrumb {
    padding: 0 0 10px 0;
  }
</style>
