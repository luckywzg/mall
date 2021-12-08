import {request} from "./request";
export function getImageTop(iid){
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
export function getRecommend(){
  return request({
    url: '/recommend'
  })
}
export class Goods{
  constructor(itemInfo, services, columns) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.lowNowPrice = itemInfo.lowNowPrice
    this.discountDesc = itemInfo.discountDesc
    this.columns = columns
    this.services = services
  }
}
export class Shop{
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
  }
}
export class GoodsParams {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables[0]
  }
}
export class Comment {
  constructor(rate) {
    //cRate用来判断是否有评论
    this.cRate = rate.cRate
    this.avatar = rate.list[0].user.avatar
    this.uname = rate.list[0].user.uname
    this.content = rate.list[0].content
    this.created = rate.list[0].created
    this.style = rate.list[0].style
    this.images = rate.list[0].images
  }
}

