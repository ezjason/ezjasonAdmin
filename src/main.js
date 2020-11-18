// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import less from 'less';
import EasyRefresh from 'vue-easyrefresh';
import Vcode from "vue-puzzle-vcode";
import store from './store/index';
import axios from './common/axios';
import color from '@/components/colorpicker/index.vue';

require('./mock');

Vue.use(EasyRefresh)

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI);
Vue.use(less)
Vue.component('v-code',Vcode)
Vue.component('v-color',color)

Vue.prototype.$axios = axios

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  // console.log(to.path, from.path)
  const token = window.localStorage.getItem('token')

  if (!token && to.path !== '/login') {
    if (to.path === '/release/notice') {
      next()
    }else if(to.path === '/regist'){
      next()
    }else if(to.path === '/forget'){
      next()
    } else {
      next('/login')
    }
  } else if (to.path === '/' && to.query && to.query.code && to.query.state) {
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
