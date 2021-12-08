//1、创建防抖函数
export function debounce(func, delay){
  let timer = null
  return function (...args) {
    //判断是否要清除上一次的setTimeout
    if(timer) clearTimeout(timer)
    timer = setTimeout( () => {
      //使用传进来的this.$refs.scroll.refresh函数
      func.apply(this, args)
    },delay)
  }
}
//2、将时间戳转换为格式化日期
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+' : date.getMonth() + 1,
    'd+' : date.getDate(),
    'h+' : date.getHours(),
    'm+' : date.getMinutes(),
    's+' : date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
