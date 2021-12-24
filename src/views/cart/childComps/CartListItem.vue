<template>
  <div class="cart-list-item">
    <div class="cart-list">
      <div class="check-button">
        <check-button :is-checked="product.checked" @click.native="checked"/>
      </div>
      <div class="cart-img">
        <img :src="product.image" alt="">
      </div>
      <div class="cart-text">
        <div class="cart-title">
          <span>{{product.title}}</span>
        </div>
        <div class="cart-desc">
          <span>{{product.desc}}</span>
        </div>
      </div>
      <div class="cart-price-count">
        <span class="cart-price">￥{{product.price}}</span>
        <span class="cart-count">x{{product.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  export default {
    name: "CartListItem",
    components: {
      CheckButton
    },
    props: {
      product: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      checked() {
        this.product.checked = !this.product.checked
      }
    }
  }
</script>

<style scoped>
  .cart-list {
    width: 100%;
    height: 150px;
    padding: 10px 0;
    border-bottom: 2px solid #ccc;
  }
  .check-button {
    height: 100%;
    float: left;
  }
  .cart-img {
    width: 25%;
    height: 100%;
    float: left;
  }
  .cart-img img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .cart-text {
    width: 65%;
    float: left;
  }
  .cart-title, .cart-desc{
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 5px 20px 15px;
  }
  .cart-desc {
    font-size: 16px;
    color: #8a898a;
  }
  .cart-price-count {
    width: 65%;
    float: left;
    padding: 20px 10px 0 15px;
    font-size: 18px;
  }
  .cart-price {
    color: #f35a07;
  }
  .cart-count {
    float: right;

  }
</style>
