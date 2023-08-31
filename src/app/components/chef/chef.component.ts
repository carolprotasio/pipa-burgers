import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

interface Order {
  client: string;
  table: string;
  waiter: string;
  status: string;
  products: [];
}

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent {
  pendingOrders: any[] = [];
  completedOrders: any[] = [];
  showPendingOrders: boolean = true;
  showImage: boolean = false; 

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
  


}
