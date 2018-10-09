import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { en_US, zh_CN, NzI18nService } from "ng-cosmos-ui";
import WaterTheme, { TranslateService } from 'water-utils';
import { environment } from "../environments/environment";
/**
 * 微服务国际化配置
 */
import { en, zh } from "./app.translate";

@Component({
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(public translate: TranslateService, private nzI18nService: NzI18nService) {
    //初始化国际化配置
    translate.setTranslation('zh', zh);
    translate.setTranslation('en', en);
    translate.addLangs(['zh', 'en']);
    translate.setDefaultLang('zh');

  }

  //主题切换
  /**
   * true 自身切换
   * false 跟随宿主应用
   */
  @Input() typeTheme: boolean = true;
  //配色
  _theme: string;
  get theme(): string {
    return this._theme;
  }

  @Input('theme')
  set theme(color: string) {
    this._theme = color;
    WaterTheme.changeTheme(color);
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
  }

  @Output() setTheme: EventEmitter<string> = new EventEmitter<string>();
  // _setTheme: EventEmitter<string>;

  //demo for single use
  //language change
  selectedLang = "zh";
  //theme change
  selectedColor = `#2185f0`;
  //less url
  lessUrl: string = environment.production ? "https://jic.talkingdata.com/fa-static-resource/less/soa.demo.less" : "/assets/less/soa.demo.less"

  ngOnInit() {
    this.typeTheme && WaterTheme.initLess(this.lessUrl)
    //订阅主题切换事件
    // this._setTheme = this.setTheme.subscribe((value: string) => WaterTheme.changeTheme(value));
  }

  switchTheme(e: string) {
    //对外通信
    this.setTheme.emit(e);
    WaterTheme.changeTheme(e);
  }

  switchLang(e: string) {
    this.translate.use(e);
    this.nzI18nService.setLocale(e === "en" ? en_US : zh_CN);
  }

  ngOnDestroy() {
    // this._setTheme.unsubscribe()
  }


}
