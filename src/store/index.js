import Vue from "vue";
import Vuex from 'vuex';
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex)

const state = {
  cartList: [
    {count: 2,
      desc: "网红同款自留款，有2个颜色4个尺码，优质现货，下单送运费险，店铺支持七天无理由退货，收到不满意退货均有运费补贴，亲们赶快下单吧！",
      iid: "1m8mrva",
      image: "//s5.mogucdn.com/mlcdn/c45406/180916_3ekh0ge37aachk6hkhade7bjgg2ll_693x694.jpg",
      price: "59.50",
      title: "秋装女2018新款时尚套装两件套早秋韩版秋季小清新女装长袖时尚宽松衣服"}
  ]
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
