import { Component, OnInit } from '@angular/core';
import { en_US, zh_CN, NzI18nService, NzMessageService } from "ng-cosmos-ui";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {
  current = 0;
  ngOnInit() {

  }

}
