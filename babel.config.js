module.exports = {
  presets: [
    '@vue/app'
  ],

  //不能全看文档，文档的说明写法还是之前的版本的
  plugins: [
    ["component",
    {
      "libraryName": "mint-ui", //针对特定的库
      "style": true             //相关样式自动引入
    }
    ]]
}
