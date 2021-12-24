import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store";
import toast from "./components/common/toast"
import FastClick from "fastclick";
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false

//事件总线
Vue.prototype.$bus = new Vue()

//安装toast
Vue.use(toast)

//使用fastclick
FastClick.attach(document.body)

//使用图片懒加载
Vue.use(VueLazyLoad,{
  loading: require('./assets/img/common/placeholder(2).png')
})

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
