
// const path = require('path')
//
// function resolve(dir) {
//   // return path.join(__dirname, '..', dir)
//   return path.join(__dirname, dir)
// }
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {   //别名
        'vue$': 'vue/dist/vue.esm.js',
        // 'components': resolve('src/components')
      }
    },
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    plugins: [
      new BundleAnalyzerPlugin()
    ]
  }
}