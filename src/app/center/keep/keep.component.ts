import { Component, OnInit, Input } from '@angular/core';
import { AppService } from '../../service/app.service';

@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.css']
})
export class KeepComponent implements OnInit {
  //注入全局接口服务
  constructor(public appService: AppService) {

  }
  @Input() secondlevel: number;
  size: string = "default";
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    //数据请求
    this.appService
      .request(
        {
          api: this.appService.api.soaUser.users
        }
      )
      .then(
        res => {
          console.log("final:", res);
        }
      );
  }

}
