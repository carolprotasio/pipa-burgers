import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChefRoutingModule } from './chef-routing.module';
import { ChefComponent } from './chef.component';
import { NavBarComponent } from '../commons/nav-bar/nav-bar.component';



@NgModule({
  declarations: [
    ChefComponent,
    NavBarComponent,
    

  ],
  imports: [
    CommonModule,
    ChefRoutingModule,    
  ],
  exports: [
    ChefComponent
  ]
})
export class ChefModule { }
