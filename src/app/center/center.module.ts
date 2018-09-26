import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './control/control.component';
import { KeepComponent } from './keep/keep.component';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-cosmos-ui';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule
  ],
  declarations: [ControlComponent, KeepComponent],
  exports: [ControlComponent]
})
export class CenterModule { }
