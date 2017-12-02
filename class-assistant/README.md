# class-assistant

> 班级助手APP

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Structure

```BASH
# Project framework
VUE + VUE-Router + Mint-UI + node + socket.io

# Project description
班级助手APP（class-assistant）是一款专注于班级管理的APP。主要包括消息、动态、多功能区、通讯录、个人中心共五个模块

# nodemon
{
	"restartable": "rs",
	"ignore": [
		// 忽略的文件后缀名或者文件夹
		".gitignore",
		"node_modules/*"
	],
	"verbose": true, // 输出详细启动与重启信息
	"execMap": {
		// 运行服务的后缀名和对应的运行命令，"js": "node --harmony" 表示用 nodemon 代替 node  --harmony 运行 js 后缀文件
		"js": "node"
	},
	"watch": [
		// 监控的文件夹路径或者文件路径。
    "router/*",
    "app.js"
	],
	"env": {
		// 运行环境 development 是开发环境，production 是生产环境。port 是端口号
		"NODE_ENV": "development"
	},
	"ext": "js json" // 监控指定后缀名的文件
}
```