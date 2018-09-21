import { Component, OnInit } from '@angular/core';
import { en_US, zh_CN, NzI18nService, NzMessageService } from "ng-cosmos-ui";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(
    private nzI18nService: NzI18nService,
    private msg: NzMessageService
  ) { }
  ngOnInit() {
    this.initColor()
  }
  setTheme(e: string) {
    this.changeColor(e)
  }

  setLang(e: string) {
    this.changeLang(e)
  }

  //language change
  selectedLang = "zh";

  changeLang(lang: any) {
    this.nzI18nService.setLocale(lang === "en" ? en_US : zh_CN);
  }

  //theme change
  selectedColor = `#2185f0`;
  initColor() {
    const node = document.createElement("link");
    node.rel = "stylesheet/less";
    node.type = "text/css";
    node.href = "/assets/less/color.less";
    document.getElementsByTagName("head")[0].appendChild(node);
  }
  lessLoaded = false;
  changeColor(res: any) {

    const changeColor = () => {
      (window as any).less
        .modifyVars({
          "@primary-color": res
        })
        .then(() => {
          this.msg.success(`应用成功`);
          this.selectedColor = res;
          window.scrollTo(0, 0);
        });
    };

    const lessUrl =
      "https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js";

    if (this.lessLoaded) {
      changeColor();
    } else {
      (window as any).less = {
        async: true
      };
      this.loadScript(lessUrl).then(() => {
        this.lessLoaded = true;
        changeColor();
      });
    }
  }

  loadScript(src: string) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

}
