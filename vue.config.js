const path = require('path')
const glob = require('glob')

// 配置需要打包的页面，实现按需打包
const PAGE_PATH_NAME = ['index']

const PAGES_PATH = path.resolve(__dirname, 'src/pages')

const getEntries = function () {
  let entries = []
  if (PAGE_PATH_NAME === '*') {
    entries = glob.sync(PAGES_PATH + '/*/main.js')
  } else {
    PAGE_PATH_NAME.forEach(name => {
      entries.push(`src/pages/${name}/main.js`)
    })
  }
  let pageConfig = {}
  entries.forEach(filePath => {
    let filename = filePath.split('/').reverse()[1]
    pageConfig[filename] = {
      entry: filePath,
      template: `src/pages/${filename}/index.html`,
      filename: `${filename}.html`,
      chunks: ['chunk-vendors', 'chunk-common', filename]
    }
  })
  return pageConfig
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  assetsDir: 'static',
  productionSourceMap: false,
  pages: { ...getEntries() },
  // 细节配置修改
  chainWebpack: config => {
    Object.keys(module.exports.pages).map(n => {
      config.plugins.delete(`preload-${n}`)
      config.plugins.delete(`prefetch-${n}`)
    })
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "~@/assets/css/mixin.scss";
        `
      }
    }
  }
}