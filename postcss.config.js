module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      viewportWidth: 375, //视窗宽度
      viewportHeight: 667, //视窗高度
      unitPrecision: 5, //指定'px'转换为视窗单位值后的小数位数
      viewportUnit: 'vw', //指定需要转换成的视窗单位
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], //指定不需要转换的类,或者直接在需要的类后面加上ignore
      minPixelValue: 1, // 小于或等于设定值的不需要转换
      mediaQuery: false, //允许再媒体查询中转换'px
    }
  }
}

