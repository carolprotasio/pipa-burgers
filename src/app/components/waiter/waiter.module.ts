import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaiterRoutingModule } from './waiter-routing.module';
import { WaiterComponent } from './waiter.component';
import { OrderModule } from '../order/order.module';



@NgModule({
  declarations: [
    WaiterComponent, 
    
  ],
  imports: [
    CommonModule,
    WaiterRoutingModule,
    OrderModule,
  ],
  exports: [
    WaiterComponent
  ]
})
export class WaiterModule { }
