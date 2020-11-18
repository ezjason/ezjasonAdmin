/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import Qs from 'qs'
import router from '../router'
const qs = require('qs')
import { Message,Alert } from 'element-ui'
import * as  r  from '@/common/index'

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  Message.error(msg)
}
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

const reLogin = res => {
  const code = res.data && res.data.code
  switch (code) {
    // "无权限访问"  初次访问根地址的时候不提示消息 4030011001
    case '4030011001':
      if (!res.config.url === instance.defaults.baseURL) {
        // tip(res.data.msg);
      }
      r.removeStore('token')
      toLogin()
      break
    // 重新登录  无效token处理
    case '4030011002':
      // tip(res.data.msg);
      r.removeStore('token')
      toLogin()
      break
    //  无权限访问资源
    case '4030011003':
      break
    // 登录过期  重新登录
    case '4010011002':
      r.removeStore('token')
      toLogin()
      break
    default:
      return res
  }
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, data) => {
  const request_id = data.data && data.data.requestId ? '(request_id:' + data.data.requestId + ')' : ''
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    // 400 请求返回错误信息
    case 400:
      if (data.data.code == '4000011007') {
        return
      }
      tip(data.data.msg + request_id || '错误代码：400')
      break
    case 401:
      tip('登录过期，请重新登录')
      reLogin(data);
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      if (data.data.code == '4030011004') {
        // 用户没有购买当前资源
        tip(data.data.msg)
        return
      }
      reLogin(data)
      // localStorage.removeItem('token');
      // store.commit('loginSuccess', null);
      // setTimeout(() => {
      //     toLogin();
      // }, 1000);
      break
    // 404请求不存在
    case 404:
      tip('请求的资源不存在')
      break
    default:
      tip(data.data && data.data.msg + request_id)
  }
}

// 创建axios实例
var instance = axios.create({ timeout: 1000 * 30 })
// 设置请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
instance.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
instance.defaults.headers['Cache-Control'] = 'no-cache'
// instance.defaults.headers['x-user-agent'] = 'YJYJ-ERP/v' + pkg.version
// instance.defaults.baseURL = baseUrl.apiUrl

// instance.defaults.baseURL ='http://192.168.0.2:30005' ;

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。

    if (config.method === 'get') {
      config.paramsSerializer = function(params) {
        return Qs.stringify(params, { arrayFormat: 'repeat' })
      }
    }

    const token = window.localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    // 设置companyId  cityCode
    // getStore("branchData") && (config.headers['X-Organ-Id'] = getStore("branchData").companyId);
    // getStore("branchData") && (config.headers['X-City-Code'] = getStore("branchData").cityCode);
    // config.headers['X-Organ-Id'] = store.state.base.branchData.orgLevelId
    // config.headers['X-City-Code'] = store.state.base.branchData.cityCode

    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {

    if(res.data.code=='4004051300'){ // 按次付费提示
      tip(res.data.msg)
      const err = new Error(res.data.msg)
      err.data = res.data.msg
      err.response = res
      throw err
    }
    return res
  },
  // res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error
    console.log(response,'errrrrrrr')
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response)
      return Promise.reject(response || error)
    }else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
      console.log('error', error)
      if(error.message !== '取消上传') {
        tip(`${error},网络出现故障！`)
      }else{
        tip(error)
      }
      return Promise.reject(response || error)
    }
    return Promise.reject((response && response.data) || error)
  }
)
export default instance

