export default [
  {
    path: '/index/test',
    name: '导航一',
    component: resolve => require(['@/components/test/index.vue'], resolve)
  },
  {
    path: '/index/test2',
    name: '导航一',
    component: resolve => require(['@/components/test/index2.vue'], resolve)
  },{
    path: '/index2/test3',
    name: '导航二',
    component: resolve => require(['@/components/test/index3.vue'], resolve)
  },{
    path: '/index4/test4',
    name: '自考查询',
    component: resolve => require(['@/components/test/index4.vue'], resolve)
  },{
    path: '/setting',
    name: '个人资料',
    component: resolve => require(['@/components/setCenter/admin.vue'], resolve)
  },{
    path: '/password',
    name: '修改密码',
    component: resolve => require(['@/components/setCenter/password.vue'], resolve)
  }
]
