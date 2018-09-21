import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {


  @Input() title: string = 'cosmos';
  ngOnInit() {

  }


}
