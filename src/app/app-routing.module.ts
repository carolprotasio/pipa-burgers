import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginModule } from './components/login/login.module';
import { ChefModule } from './components/chef/chef.module';
import { AdminModule } from './components/admin/admin.module';
import { WaiterModule } from './components/waiter/waiter.module';

import { LoginComponent } from './components/login/login.component';
import { WaiterComponent } from './components/waiter/waiter.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'waiter', 
    component: WaiterComponent 
  },
  {
    path: '',
    loadChildren: () => import('./components/login/login.module').then( m => LoginModule)
  },
  {
    path: 'chef',
    loadChildren: () => import('./components/chef/chef.module').then( m => ChefModule)

  },
  {
    path: 'admin',
    loadChildren: () => import('./components/admin/admin.module').then( m => AdminModule)

  },
  {
    path: 'waiter',
    loadChildren: () => import('./components/waiter/waiter.module').then( m => WaiterModule)

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
