# ng-zorro-admin
基于ng-zorro搭建的后台管理系统框架

## 1. 项目结构
```
├── dist
├── ├── ng-zorro-admin // 项目打包目录
├── ├── nz-admin // 项目组件库打包目录
├── node_modules
├── projects
├── ├── nz-admin // 组件库，通过ng generate library nz-admin生成
├── scripts
├── ├── build
├── ├── ├── compact-vars.ts // 生成紧凑主题变量
├── ├── ├── compile-styles.ts // 编译主题样式文件
├── ├── ├── dark-vars.ts // 生成暗黑主题变量
├── ├── ├── generate-less-vars.ts // 生成less变量
├── ├── gulp
├── ├── ├── tasks
├── ├── ├── ├── library.ts // 打包组件库并生成主题样式文件
├── ├── ├── utils
├── ├── ├── ├── task-helper.ts
├── ├── ├── gulpfile.ts // gulp入口文件
├── ├── ├── tsconfig.json
├── ├── color.js // antd-theme-generator，用于生成less样式文件的脚本，在线切换主色调等样式变量
├── ├── theme.js // 用于生成主题文件的脚本
├── src
├── ├── app
├── ├── ├── configs // 配置目录
├── ├── ├── core // 主目录
├── ├── ├── ├── auth // 认证鉴权服务
├── ├── ├── ├── ├── auth-guard.service.ts
├── ├── ├── ├── ├── auth.service.ts
├── ├── ├── ├── i18n // 国际化服务
├── ├── ├── ├── ├── i18n.service.ts
├── ├── ├── ├── interceptors // 请求响应拦截
├── ├── ├── ├── ├── _ignore.ts
├── ├── ├── ├── ├── _index.ts
├── ├── ├── ├── ├── auth-interceptor.ts
├── ├── ├── ├── ├── noop-interceptor.ts
├── ├── ├── ├── ├── response-interceptor.ts
├── ├── ├── ├── startup // 启动服务
├── ├── ├── ├── ├── startup.service.ts
├── ├── ├── ├── core.module.ts
├── ├── ├── ├── index.ts
├── ├── ├── pages // 业务模块
├── ├── ├── shared
├── ├── ├── ├── directives
├── ├── ├── ├── services
├── ├── ├── ├── states // 状态管理 @ngxs/store
├── ├── ├── ├── utils // 工具类
├── ├── ├── ├── index.ts
├── ├── ├── ├── shared-zorro.module.ts
├── ├── ├── ├── shared.module.ts
├── ├── ├── app-config.module.ts
├── ├── ├── app-routing.module.ts
├── ├── ├── app.component.ts
├── ├── ├── app.module.ts
├── ├── assets
├── ├── ├── i18n
├── ├── ├── images
├── ├── ├── libs
├── ├── ├── mocks
├── ├── ├── .gitkeep
├── ├── ├── default.less
├── ├── ├── style.compact.css // 紧凑主题样式，切换主题时使用
├── ├── ├── style.dark.css // 暗黑主题样式，切换主题时使用
├── ├── environments
├── ├── styles
├── ├── ├── themes // 动态样式需要配置在此文件夹下
├── ├── ├── ├── default.less
├── ├── ├── empty.less
├── ├── ├── index.less
├── ├── favicon.ico
├── ├── index.html
├── ├── main.ts
├── ├── polyfills.ts
├── ├── styles.less
├── ├── test.ts
├── .browserslistrc
├── .editorconfig
├── .gitattributes
├── .gitignore
├── angular.json
├── build-config.js
├── build-config.ts
├── debug.log
├── gulpfile.js
├── karma.conf.js
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.base.json
├── tsconfig.json
├── tsconfig.spec.json
├── tslint.json
```

## 2. 打包分析(webpack-bundle-analyzer)
#### 2.1 安装webpack-bundle-analyzer
```
npm install webpack-bundle-analyzer --save-dev
```
#### 2.2 添加打包参数
```
ng build --prod --stats-json
```
#### 2.3 添加指令
```
"bundle-report": "webpack-bundle-analyzer dist/[projectName]/stats.json"
```
#### 2.4 运行
```
npm run bundle-report
```

## 3.文档
* [动态主题](./doc/theme.md)