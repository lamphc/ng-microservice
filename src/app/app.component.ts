/**
 * soa 对外接口封装
 * https://github.com/water-design/fe-microservice-base
 * @Input()
 * urlbase
 * typetheme
 * theme
 * lang
 * ...
 * lessurl
 * @Output()
 * onThemeChange
 * onLangChange
 */
import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { en_US, zh_CN, NzI18nService } from "ng-cosmos-ui";
import WaterTheme, { TranslateService } from 'water-utils';
import { AppService } from './service/app.service';
import { environment } from "../environments/environment";
/**
 * 微服务国际化配置
 */
import { en, zh } from "./config/app.translate";

//主题切换方式
enum TYPETHEME { self, fork }
@Component({
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public translate: TranslateService, private nzI18nService: NzI18nService, public appService: AppService) {
    //初始化国际化配置
    translate.setTranslation('zh', zh);
    translate.setTranslation('en', en);
    translate.addLangs(['zh', 'en']);
    translate.setDefaultLang('zh');

  }

  //water-service baseUrl
  @Input() urlbase: string;
  //主题切换
  /**
   * self 自身切换
   * fork 跟随宿主应用
   */

  @Input()
  typetheme: string = TYPETHEME[0];
  //配色
  _theme: string;
  get theme(): string {
    return this._theme;
  }

  @Input('theme')
  set theme(color: string) {
    this._theme = color;
    (this.typetheme === TYPETHEME[0]) && WaterTheme.changeTheme(color) && this.onThemeChange.emit(color);
  }
  //多语
  _lang: string;
  get lang(): string {
    return this._lang;
  }

  @Input('lang')
  set lang(la: string) {
    this._lang = la;
    this.translate.use(la);
    this.nzI18nService.setLocale(la === "en" ? en_US : zh_CN);
    this.onLangChange.emit(la);
  }

  @Output() onThemeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onLangChange: EventEmitter<string> = new EventEmitter<string>();
  // _setTheme: EventEmitter<string>;

  /**
   * debug
   * 主题样式未部署时使用该接口传入调试地址
   */
  @Input() lessurl: string;

  /**
   * less url
   * 主题切换自定义配置
   */
  lessUrl: string = environment.production ? "https://jic.talkingdata.com/fa-static-resource/less/soa.demo.less" : "/assets/less/soa.demo.less"

  ngOnInit() {
    this.lessurl && (this.lessUrl = this.lessurl);
    (this.typetheme === TYPETHEME[0]) && WaterTheme.initLess(this.lessUrl);
    //设置water-service 接口urlBase
    this.urlbase && this.appService.setUrlBase(this.urlbase);

  }

  /**
   * demo for single use with water-utils
   * can del
   */
  //language change
  selectedLang = this._lang ? this._lang : "zh";
  //theme change
  selectedColor = this._theme ? this._theme : `#2185f0`;

  switchTheme(e: string) {
    if (this.typetheme !== TYPETHEME[0]) return;
    //对外通信
    this.onThemeChange.emit(e);
    WaterTheme.changeTheme(e);
  }

  switchLang(e: string) {
    this.translate.use(e);
    this.nzI18nService.setLocale(e === "en" ? en_US : zh_CN);
    this.onLangChange.emit(e)
  }


  ngOnDestroy() {

  }


}
