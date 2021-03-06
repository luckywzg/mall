module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 667,  //视窗的高度，对应的是我们设计稿的高度，一般为1334
      unitPrecision: 5, //指定'px'转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', //指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore'],
      // selectorBlackList: ['ignore','tab-bar'],  //指定不需要转换的类，入tab-bar，ignore表示忽略加了ignore这个class的标签
      minPixelValue: 1, //小于或等于'1px'不转换为视窗单位，忽略的最小像素
      mediaQuery: false,  //允许在媒体查询中转换'px'
      // exclude:[/TabBar/]  //在不转换的组件内部的图片这类也不做转换，数组内需使用正则表达式
    }
  }
}
