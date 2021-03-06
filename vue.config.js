const path = require('path')
function resolve(dir) {
  return path.join(__dirname, './node_modules', dir)
}

module.exports = {
  publicPath: "",
  productionSourceMap: process.env.NODE_ENV === 'development',
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : undefined,
  },
  // 它支持webPack-dev-server的所有选项
  devServer: {
    host: "0.0.0.0",
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    hot: true,
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理

    // 配置多个代理
    proxy: {
      "/": {
        target: 'http://192.168.1.103:9008', // 要访问的接口域名
        ws: true, // 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      }
    }
  },
  // 在exports中添加，这里很关键，不配置不行
  transpileDependencies: ['vue-awesome-swiper'],
  chainWebpack(config) {
        // 在chainWebpack中添加下面的代码
        config.entry('main').add('babel-polyfill') // main是入口js文件
  }  

}