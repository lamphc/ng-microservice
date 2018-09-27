# SOA-FE 前端微服务开发指南

## 简介
![soa](./src/assets/img/soa.png)
&emsp;&emsp;对于网络应用程序,前端越来越大,我们的网络应用程序中90％是前端代码.

&emsp;&emsp;随着时间的推移,Web应用也会发生变化,开发技术和框架也是如此, 这需要支持允许不同的前端框架共存、共用、共生, 前端微服务化应运而生.

## 准备
1. 获取微服务基础工程

    下载github微服务[基础工程ZIP包](https://github.com/water-design/fe-microservice-base/archive/master.zip),然后初始化git和安装依赖.

  - 依赖
    
    a. angular版本: 6.1
    
    b. 微服务开发统一使用[ng-cosmos-ui](https://water-design.github.io/ng-cosmos-ui/)组件库,[water-service](https://confluence.tendcloud.com/display/VD/water-service)处理后端数据.
    
  - 目录说明
      
    ├── [说明]  README.md
    ├── [ng配置]  angular.json
    ├── [webpack配置]  config
    ├── [微服务部署]  deploy
    ├── [打包输出]  dist
    ├── [测试]  e2e
    ├── [依赖包]  node_modules
    ├── [依赖锁定]  package-lock.json
    ├── [依赖配置]  package.json
    ├── [代码检查]  sonar-project.properties
    ├── [开发目录]  src
    ├── [测试]  test.json
    ├── [ts配置]  tsconfig.json
    ├── [ts检查]  tslint.json
    └── [webpack基础配置]  webpack.config.js

2. 启动工程

```node
//安装依赖
$ npm i

//启动开发服务
$ npm start

```

## 定义微服务

1. 在根Module中定义
需要引入@angular/elements,elements-zone-strategy,示例:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-cosmos-ui';
import { AppComponent } from './app.component';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgZorroAntdModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  entryComponents: [AppComponent]
})
export class AppModule {

  constructor(private injector: Injector) {
    const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const customCosmos = createCustomElement(AppComponent, { injector: this.injector, strategyFactory });
    if (!customElements.get('soa-demo')) {
      customElements.define('soa-demo', customCosmos);
    }
  }

  ngDoBootstrap() {

  }
}

```

2. ElementZoneStrategyFactory工厂函数返回一个Angular Component 和 Custom Elements 的桥梁策略类,创建和销毁组件引用,同时它还会在 input 改变时触发脏检查,示例:
```ts
...
const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
...
```
3. createCustomElement和customElements.define分别创建和定义一个自定义元素,其中customElements.define第一个参数为最终定义的自定义元素标签名称,示例:
- ts代码
```ts
...
const customCosmos = createCustomElement(AppComponent, { injector: this.injector, strategyFactory });
if (!customElements.get('soa-demo')) {
  customElements.define('soa-demo', customCosmos);
}
...
```
- html代码
```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>ElementsLoading</title>
  <base href="/">

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" href="../deploy/css/ng-cosmos-ui.min.css">
</head>

<body>
   <soa-demo></soa-demo>
</body>

</html>
```


扩展阅读:[可重用网络组件](https://developers.google.com/web/fundamentals/web-components/customelements)   

## 微服务命名规范和注意事项

- 元素定义命名规范,标签以soa-开头,后追加上该微服务英文名称,对应js文件以soa.开头,命名同标签,示例:
```ts
  //js命名
  soa.soaname.js
  //tag定义
  <soa-soaname></soa-soaname>
```
- 微服务中不能使用路由,有需要用到路由的场景需要分拆服务

## 开发规范

- 遵循[angular风格指南](https://angular.cn/guide/styleguide)开发
- Tslint语法规范
- SonarQube规范

## 本地部署和测试
- 修改对应脚本和部署文件
1. 修改package.json中"copy:bundle"项,示例:
```json
"copy:bundle": "cpr dist/soa-elements/main.js deploy/soa/soa.soaname.js -o",
```
2. 修改deploy目录index.html对应的js引用,示例:
```html
<html>

<head>
  <meta charset="UTF-8">
  <title>Soa demo for test</title>
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" type="text/css" href="./css/ng-cosmos-ui.min.css">
  <!-- Gz share dep -->
  <script src="./common/soa.base.js"></script>
  <!-- Custom Element For SOA -->
  <script src="./soa/soa.soaname.js"></script>
</head>

<body>
  <!-- Calling SOA -->
  <soa-soaname title="service"></soa-soaname>
</body>

</html>
```

- 执行脚本
```node
//部署微服务
$ npm run deploy

//更新微服务
$ npm run build
```

## 多语和主题


## 云端部署





