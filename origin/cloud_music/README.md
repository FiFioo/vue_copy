# Welcome to cloudMusic😀

出于对学习的热爱[伪]，又因为自身以后发展的需要，随着对Vue的渐次学习，需要真正的做个综合性的小Demo了，来巩固所学知识。由于Github上有大佬提供了很不错的[云音乐开发接口](https://github.com/Binaryify/NeteaseCloudMusicApi)，以及对音乐的喜爱，故开发此项目。

## 👇如何使用

```sh
1、下载项目
git clone https://github.com/niansnana/cloudMusic.git
2、切换项目文件夹后下载依赖
yarn install || npm install
3、运行项目
yarn server
```

## 👀技术栈

#### 前端

- `Vue`：用于构建用户界面的 MVVM 框架
- `vue-router`：为单页面应用提供的路由系统，使用了 `Lazy Loading Routes` 技术来实现异步加载优化性能
- `vuex`：Vue 集中状态管理，在多个组件共享某些状态时非常便捷
- `Stylus`：css 预编译处理器
- `ES6`：ECMAScript 新一代语法，模块化、解构赋值、Promise、Class 等方法非常好用

#### 后端

- `vue-axios`：用来请求后端 API 音乐数据
- `NeteaseCloudMusicApi`：网易云音乐 NodeJS 版 API，提供音乐数据

#### 其他工具

- `vue-cli`：Vue 脚手架工具，快速初始化项目代码
- `eslint`：代码风格检查工具，帮助我们规范代码书写（一定要养成良好的代码规范）
- `iconfont` ：阿里巴巴图标库（待使用，vant图标太少了。

- `Vant-Ui`：轻量、可靠的移动端Vue组件库

## 👤项目预览

- [Preview](http://cm.niansnana.com/) （建议使用主流浏览器）tip:若出现跨域，那是小惊喜:(哭
- 截图：待补充

## ☂️实现功能

- [x] 基本布局

- [x] 发现页轮播图

- [x] 推荐歌单

- [ ] 新歌|新碟

- [x] 歌单广场

- [x] 歌曲列表

- [x] 歌曲详情

- [x] 登录功能

- [ ] 视频页面

- [ ] 云村页面

- [x] 音乐播放

- [x] 歌曲评论

- [ ] 个人中心

  ...

## 🌸TODO

- **版本信息：** 1.0
- **时间**：2020年4月15日
- **更新内容：**
  - 切换歌曲
  - 歌曲评论
  - 其他
- **吐槽**：我真懒，每天都只写一个demo，希望明天能勤快些。

## 🌂项目布局

```vue
.src
+-- api
|   +-- config.js // 存储api请求地址
|   +-- index.js // 调用请求方法
+-- assets
|   +-- iconfont
    |   +-- iconfont.css // 阿里图标
|   +-- stylus
    |   +-- resetvant.sty // 重置Vant样式
+-- commponents // 公共组件
    +-- Comment // 歌曲评论列表
    +-- Header // 公共布局-头部
    +-- Loading // 加载动画
    +-- Player // 播放界面组件
+-- filters // 过滤器
    +-- index.js // 工具函数
+-- plugin // 集成插件中心
	+-- vant.js // Vant插件按需引入
+-- router // 路由配置
    +-- index.js
+-- store // vuex 配置使用
    +-- action // 根级别的 action
    +-- getter // 根级别的 getter
    +-- index // 组装模块并导出 store 的地方
    +-- mutation-types // 根级别的 mutation-types
    +-- mutation // 根级别的 mutation
    +-- state // 根级别的 state
+-- views
	+-- find // 发现页面
	+-- friend // 朋友页面（云村）
	+-- home // 用户(我)的界面
	+-- login // 登录页面
	+-- main // 主布局
	+-- songSquare // 歌单广场
	+-- video // 视频页面（可能之后会替换）
```

## 🦄臭名昭著的B·U·G

*首先感谢jojo中[卡尔涅](https://baike.baidu.com/item/卡尔涅/23498352)的替身名灵感。*

在这里碎碎念，我遇到过的那些十分无奈的问题，实时更新。

那些bug或许在你眼中，不过尔尔，但那时也是真的差点使我成了暴躁老哥了。

- [x] Vant 样式未重置bug

  <p style="font-size: 12px;text-indent: 2em;">
  由于vue组件样式中，如若含有scope，则无法传递父组件，故无法重置
  解决办法：需要定义一个全局样式，由样式名来传递
  </p>

- [x] API用户登录后，部分接口依旧提示尚未登录

  <p style="font-size: 12px;text-indent: 2em;">
  这个bug，真的，很难过很暴躁，那天上午都想一键格式化算了，下午才一个一个重新敲，一点一点观察其中的变化，才明白了其中的问题所在，弄清楚其中到底发生什么了，现在又有动力继续了。现在回头想想，也真是可笑。
  </p>

- [ ] api接口返回的数据含有JSON格式，数据不好拿

  <p style="font-size: 12px;text-indent: 2em;">
  我再想想，怎么获取呢，感觉挺简单的，拿就那么麻烦。
  </p>
  
- [ ] 路由动态刷新

  <p style="font-size: 12px;text-indent: 2em;">
  明天应该就能完美解决了，去追怒晴湘西了，哈哈。
  </p>

## 作者

🐤[niansnana](https://niansnana.github.io/vuepress/about/)

