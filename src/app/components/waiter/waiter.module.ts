import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaiterRoutingModule } from './waiter-routing.module';
import { WaiterComponent } from './waiter.component';


@NgModule({
  declarations: [
    WaiterComponent
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule
  ],
  exports: [
    WaiterComponent
  ]
})
export class WaiterModule { }
