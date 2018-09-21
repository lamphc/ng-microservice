import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-keep',
  templateUrl: './keep.component.html',
  styleUrls: ['./keep.component.css']
})
export class KeepComponent implements OnInit {

  constructor() { }
  size: string = "default";
  time: Date | null = null;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);
  ngOnInit() {
  }

}
