export default {
  state: {
    name: 'ezjason',
    color: '#F1BD4E',
    imageURL: require('../../../static/g.gif'),
    srcList:[require('../../../static/g.gif')],
    menu:[{
      label: '导航一',
      icon: 'el-icon-location',
      id:0,
      parentId:-1,
      children:[{
        label:'选项1',
        icon:'el-icon-location',
        href:'/index/test',
        parentId:0,
        id:4
      },{
        label:'选项2',
        icon:'',
        href:'/index/test2',
        parentId:0,
        id:5
      }]
    }, {
      label: '导航二',
      icon: 'el-icon-menu',
      parentId:-1,
      id:1,
      children:[{
        label:'选项1',
        icon:'',
        href:'/index2/test3',
        id:6,
        parentId:1
      },{
        label:'选项2',
        icon:'',
        href:'/index/test',
        id:7,
        parentId:1
      }]
    }, {
      label: '导航三',
      icon: 'el-icon-document',
      id:2,
      children:[{
        label:'选项1',
        icon:'',
        href:'/index/test',
        id:8,
        parentId:2
      },{
        label:'选项2',
        icon:'',
        href:'/index/test',
        id:9,
        parentId:2
      }]
    },{
      label: '自考查询',
      icon: 'el-icon-setting',
      href:'/index4/test4',
      id:3,
      parentId:-1
    }],
    breadcrumb:[]
  },
  mutations: {
    changeName (state, val) {
      state.name = val
    },
    changeColor(state,val){
      state.color = val
    },
    changeUrl(state,val){
      state.imageURL = val
    },
    changeMenu(state,val){
      state.menu = val
    },
    changeBreadcrumb(state,val){
      state.breadcrumb = val
    }
  },
  actions: {}
}
