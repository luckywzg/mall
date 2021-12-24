import {ADD_COUNTER, ADD_TO_CART} from "./mutations_types";

export default {
  //context中包含state和commit，可以对其进行解构
  //context => {state, commit}
  addCart({state, commit}, payload) {
    //包装一层Promise，可以在Detail中进行下一步操作
    return new Promise((resolve, reject) => {
      //遍历cartList
      //不能遍历空数组
      //它突然又行了
      // if(!state.cartList.length){
      //   payload.count = 0
      //   //发送给mutation中的ADD_TO_CART处理
      //   commit(ADD_TO_CART, payload)
      // }
      //记录添加的是否是相同商品
      // let oldProduct = null
      // //使用for-of循环
      // for(let item of state.cartList) {
      //   //判断将要添加的是否是添加过的
      //   if(item.iid === payload.iid) {
      //     //如果是让oldProduct不为空
      //     oldProduct = item
      //   }
      // }
      //使用数组find函数
      let oldProduct = state.cartList.find(item => payload.iid === item.iid)
      //判断oldProduct是否为空，不为空则为true，代表不是第一次添加该商品
      if(oldProduct) {
        //发送给mutation中的ADD_COUNTER处理
        commit(ADD_COUNTER, oldProduct)
        resolve('商品数量+1')
      } else {
        //如果是第一次添加的商品
        payload.count = 1
        //发送给mutation中的ADD_TO_CART处理
        commit(ADD_TO_CART, payload)
        resolve('添加购物车成功')
      }
    })
  }
}
