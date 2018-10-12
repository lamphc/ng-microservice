import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  //注入全局接口服务
  constructor(public appService: AppService) {

  }

  ngOnInit() {
    this.modUser();
    // this.addUser()
  }

  modUser() {
    //数据请求
    this.appService
      .request(
        {
          api: this.appService.api.soaUser.userMod,
          restful: "/10",
          params: { name: 'mod-name' }
        }
      )
      .then(
        res => {
          console.log("final:", res);
        }
      );
  }

  addUser() {
    this.appService
      .request(
        {
          api: this.appService.api.soaUser.userAdd,
          params: { name: 'add-name' }
        }
      )
      .then(
        res => {
          console.log("add:", res);
        }
      );
  }

}
