module.exports = {
  // 修改相对路径
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  // 关闭productionSourceMap文件的生成
  productionSourceMap: false,
  devtool: '#source-map',
  pwa: {
    // 添加ico图标
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}
