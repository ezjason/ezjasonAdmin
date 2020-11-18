import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index';
import Login from '@/components/login/login.vue';
import Regist from '@/components/login/regist.vue';
import Forget from '@/components/login/forget.vue';

Vue.use(Router)
// const Routes = [
//   ...Login
// ]

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/index',
      name: 'index',
      component: index
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/regist',
      name: 'regist',
      component: Regist
    },{
      path: '/forget',
      name: 'forget',
      component: Forget
    }
  ]
})
