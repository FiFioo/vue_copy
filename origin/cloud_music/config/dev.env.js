/**
 * @Author niansnana
 * @Begin 2020年4月4日12:52:29
 * @Info 开发环境配置
 * @Url https://github.com/niansnana/cloudMusic
 */
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
