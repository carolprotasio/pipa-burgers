import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChefRoutingModule } from './chef-routing.module';
import { ChefComponent } from './chef.component';




@NgModule({
  declarations: [ ChefComponent ],
  
  imports: [
    CommonModule,
    ChefRoutingModule,    
  ],
  exports: [
    ChefComponent
  ]
})
export class ChefModule { }
