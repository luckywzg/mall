import Toast from "./Toast"
const obj = {}
//当在main中挂载后，会来这里安装插件
//默认参数时Vue
obj.install = function (Vue) {
  console.log('执行了install函数')
  //1、创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  //2、new的方式，根据组件构造器可以构建出来一个组件对象
  const toast = new toastContrustor()
  //3、将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement('div'))
  //4、toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  //5、将toast写入Vue原型
  Vue.prototype.$toast = toast;
}
//导出
export default obj
