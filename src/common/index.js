// 验证码倒计时
export function Countdown (_this) {
  if (!_this.beginCountdown) {
    _this.beginCountdown = true
    let time = 60
    let timer

    if (timer) {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      _this.codeMsg = '倒计时' + time + '秒'
      time--;
      if(time===0){
        _this.codeMsg = "获取验证码"
        _this.beginCountdown = false;
        time = 60;
        clearInterval(timer)
      }
    }, 1000)
  }
  return '12'
}


/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}
/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  if (JSON.parse(window.localStorage.getItem(name)) instanceof Object) {
    return JSON.parse(window.localStorage.getItem(name));
  } else {
    return window.localStorage.getItem(name)
  }
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}


/**
 * 存储sessionStorage
 */
export const setSession = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getSession = name => {
  if (!name) return;
    if (JSON.parse(window.sessionStorage.getItem(name)) instanceof Object) {
      return JSON.parse(window.sessionStorage.getItem(name));
    } else {
      return window.sessionStorage.getItem(name)
    }
}

/**
 * 删除sessionStorage
 */
export const removeSession = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}
