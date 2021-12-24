import {
  ADD_COUNTER,
  ADD_TO_CART,
  IS_SELECT_ALL_FALSE,
  IS_SELECT_ALL_TRUE
} from "./mutations_types";
export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART](state, payload){
    payload.checked = false
    state.cartList.push(payload)
  },
  [IS_SELECT_ALL_FALSE](state) {
    state.cartList.filter(item => item.checked = false)
  },
  [IS_SELECT_ALL_TRUE](state) {
    state.cartList.filter(item => item.checked = true)
  }
}
