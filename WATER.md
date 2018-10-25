# Water-Service

# 前言
提供统一的数据库接口配置管理.独立的管道和中间件机制,从请求开始、进行、结束各个环节的流式管道处理过程.同时支持数据加工中间件的自注入,达到理想的所要即所得的状态.

# 实例接口
默认实例:waterService

| 属性           | 说明               | 类型       | 默认值 |
| -------------- | ------------------ | ---------- | ------ |
| **`provider`** | 数据库配置         | `function` |        |
| **`timeout`**  | 超时设置           | `number`   | 5000   |
| **`use`**      | 中间件配置         | `function` |        |
| **`plugin`**   | 数据加工公共中间件 | `function` |        |
| **`request`**  | 数据请求           | `function` |        |

# 接口功能
```js
//数据库接口配置
export default interface ConfDataBase {
  baseUrl: string;
  database: {
    [schemaName: string]: Schema;
  };
}

/**
 * 数据库实体表
 */
export interface Schema {
  [apiName: string]: SchemaApi;
}

/**
 * 数据库实体接口
 */
export interface SchemaApi {
  suffix: any;
  method: string;
  url?: string;
  params?: object;
}


```
# 安装

```npm
npm i water-service
```
# 使用示例
- 在angular下使用示例
1. 创建全局service,引入water-service,示例:
```ts
/**
 * 基于water-service ng-crud服务封装
 * 本服务不需要provider,使用时直接注入
 * root
 * tree-shaking
 */
import { Injectable } from '@angular/core';
import waterService, { WaterService, ConfDataBase, requestType, responseFilters } from "water-service";
import { NzNotificationService } from 'ng-cosmos-ui';
import { DATABASE } from "../config/app.database";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private confDataBase: ConfDataBase;
  readonly api = DATABASE.database;
  constructor(private notification: NzNotificationService) {
    this.confDataBase = DATABASE;

    //注册数据库接口配置
    waterService.provider(this.confDataBase);

    //设置请求超时时间
    waterService.timeout = 6000;

    //注册全局数据流中间件
    let token = Math.random() * 10000;
    waterService.interceptors.request.use(conf => {
      //设置请求header头(无需设置content-type)
      conf.headers = { Authorization: "Bearer " + token };
      return conf;
    });

  }


  /**
   * common
   * main rewrite request
   * @param type 
   * @param filters 
   */
  request(type: requestType, filters?: responseFilters): Promise<any> {
    return waterService
      .request(
        type,
        filters
      ).catch((e: any) => this.handlerError(e))
  }
  /**
   * common
   * handler error
   * @param e 
   */
  handlerError(e: any) {
    this.notification.create('info', 'Error', `status:${e.status}\nmsg:${e.msg}`)
  }

  /**
   * accept urlBase
   * @param url 
   */
  setUrlBase(url: string) {
    this.confDataBase.baseUrl = url
  }

}
```
2. 配置water-service接口,示例:
```ts
/**
 * water-service 接口配置
 * config water-service database
 * https://confluence.tendcloud.com/display/VD/water-service
 * base end database
 * schema
 * table
 * api
 */
export const DATABASE = {
  baseUrl: "http://172.26.126.90:3000",
  // baseUrl: "",
  database: {
    //module | table
    user: {
      login: {
        prefix: "/user/login",
        method: "post"
      }
    },
    project: {
      projectlist: {
        prefix: "/project/list",
        method: "get"
      },
      projectNew: {
        prefix: "/project/save",
        method: "post"
      },
      errorhandler: {
        prefix: "/error/handler",
        method: "put"
      },
      projectDelete: {
        prefix: "/project/delete/:id",
        method: 'delete'
      }
    }
  }
};

```
3. 在业务模块中调用,示例:
```ts
import { Component, OnInit} from '@angular/core';
import { AppService } from './service/app.service';
@Component({...})
export class DemoComponent implements OnInit{
    //注入service
    constructor(public appService:AppService){}
    
      ngOnInit() {
          //数据请求
          this.appService
            .request(
              { 
                api: this.appService.api.user.login,
                params: { name: "test" } 
              }
            )
            .then(
              res => {
                console.log("final:", res);
              },
              err => console.log("final-err:", err)
            );
      }
}
```
- 其它独立请求调用(目前只支持get、post方法),示例:

```ts
import waterService from "water-service";

...
  let url = "http://5ab211b762a6ae001408c1d0.mockapi.io/ng/heroes";
  waterService.get(url,{params:'params'}).then(res => console.log("get:", res));
...  
```  

- 多实例支持,示例:
```ts
import { WaterService } from "water-service";

//多实例的创建
let otherService = WaterService.create();
...
```

参考:[微服务使用示例](https://github.com/water-design/fe-microservice-base)