<template>
  <div class="check-button-bar">
    <div class="checked" >
      <check-button :is-checked="isAllChecked" @click.native="isSelectAll"/>
      <span>全选</span>
    </div>
    <div class="total-price">
      <span>总价：{{totalPrice}}</span>
    </div>
    <div class="price-counter">
      去结算({{calculateLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import { mapGetters } from "vuex"
  export default {
    name: "CheckButtonBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters([
        'cartList'
      ]),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((initPrice, item) => {
          //initPrice是字符串类型
          return (initPrice * 1) + item.price * item.count
        }, 0).toFixed(2)
      },
      calculateLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isAllChecked() {
        //当没有商品时，默认状态为不全选
        if (!this.cartList.length) return false
        //当没有不选中的商品时，状态为全选
        return !this.cartList.find(item => !item.checked)
        // return !this.cartList.filter(item => !item.checked).length
      }
    },
    methods: {
      isSelectAll() {
        if(this.isAllChecked) {
          this.$emit('isSelectAllFalse')
          //不要直接操作store里的数据，不好监听
          // this.cartList.filter(item => item.checked = false)
        }else {
          this.$emit('isSelectAllTrue')
          // this.cartList.filter(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .check-button-bar {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: #e5e5e5;
  }
  .checked {
    display: flex;
    width: 80px;
  }
  .isChecked {
    background-color: red;
  }
  .total-price {
    flex: 1;
  }
  .price-counter {
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: 700;
    color: #f35a07;
    margin-right: 10px;
  }
</style>
