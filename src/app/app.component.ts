import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { en_US, zh_CN, NzI18nService } from "ng-cosmos-ui";
import WaterTheme, { TranslateService } from 'water-utils';
import { en, zh } from "./app.translate"
@Component({
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(public translate: TranslateService, private nzI18nService: NzI18nService) {
    //初始化国际化配置
    translate.setTranslation('zh', zh);
    translate.setTranslation('en', en);
    translate.addLangs(['zh', 'en']);
    translate.setDefaultLang('zh');

  }
  @Input() title: string = 'cosmos';
  //demo
  //language change
  selectedLang = "zh";
  //theme change
  selectedColor = `#2185f0`;

  ngOnInit() {
    WaterTheme.initLess()
  }
  setTheme(e: string) {
    WaterTheme.changeTheme(e)
  }

  setLang(e: string) {
    this.translate.use(e);
    this.nzI18nService.setLocale(e === "en" ? en_US : zh_CN);
  }



}
