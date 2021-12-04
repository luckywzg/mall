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
