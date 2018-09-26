import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'water-utils';
@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.css']
})
export class KeepComponent implements OnInit {

  constructor(public translate: TranslateService) {

  }
  size: string = "default";
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  ngOnInit() {
  }

}
