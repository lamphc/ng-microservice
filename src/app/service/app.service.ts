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
    let token = Math.random() * 10000
    waterService.interceptors.request.use(conf => {
      //设置请求header头(无需设置content-type)
      conf.headers = { access_token: token };
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
