/**
 * soa-demo
 * https://github.com/water-design/fe-microservice-base
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-cosmos-ui';
import { CenterModule } from './center/center.module';
import { AppComponent } from './app.component';

// 配置 angular i18n
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

// 配置 water-utils i18n for soa
import { TranslateModule, TranslateLoader, HttpLoaderFactory } from "water-utils";
import { HttpClientModule, HttpClient } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CenterModule,
    NgZorroAntdModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  entryComponents: [AppComponent]
})

export class AppModule {
  //定义微服务
  constructor(private injector: Injector) {
    const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const customCosmos = createCustomElement(AppComponent, { injector: this.injector, strategyFactory });
    customElements.define('soa-demo', customCosmos);
  }

  ngDoBootstrap() { }
}

