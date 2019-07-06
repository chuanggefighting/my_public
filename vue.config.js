let path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const Timestamp = new Date().getTime();

module.exports = {
  // 部署应用时的基本 URL
  publicPath: "./",
  // build 时放置生成的静态资源
  assetsDir: 'static',
  // 取消eslint验证
  lintOnSave : false,
  
  configureWebpack: config => {

    // 输出重构：解决 js 缓存问题
    if(process.env.NODE_ENV === 'production') {
      Object.assign(config.output, {
          // 输出重构，打包编译后的文件名称：模块名称-版本号-时间戳
          filename: `[name]-${process.env.VUE_APP_Version}-${Timestamp}.js`,
          chunkFilename: `[name]-${process.env.VUE_APP_Version}-${Timestamp}.js`
      })
    }

    // 引入 vux-ui
    require('vux-loader').merge(config, {
      options: {},
      plugins: ['vux-ui']
    })
  },
  // 配置目录别名
  chainWebpack: config => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'))
  },
  devServer: {
    port: 10080, // 端口号  
    host: "127.0.0.1",
    https: false, // https:{type:Boolean}
    // open: true, 
    proxy: {
      '/apigateway': {
        // target: 'http://10.1.20.189:9090/apigateway/',
        target: 'http://10.1.15.78:9091/apigateway/',
        changeOrigin: true,
        pathRewrite: {
          '^/apigateway': ''
        }
      }
    }
  }
}

