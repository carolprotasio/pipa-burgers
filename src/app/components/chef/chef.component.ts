import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { OrderService } from 'src/app/services/order/order.service';


interface Order {
  id: number;
  client: string;
  table: string;
  waiter: string;
  status: string;
  completedDate: string;
  orderDelivered: string;
  products: { name: string; quantity: number }[];
}

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css'],
})
export class ChefComponent implements OnInit {
  pendingOrders: Order[] = [];
  completedOrders: Order[] = [];
  showPendingOrders: boolean = true;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    /* this.loadOrders(true); */
  }

  loadOrders(isPending: boolean) {
   
    this.showPendingOrders = isPending;
   

    
      this.orderService
       .getOrders()
        .subscribe(
          (response) => {
            console.log('Response from server:', response);
            this.pendingOrders = response.filter(
              (order: Order) => order.status === 'pending'
            );
            this.completedOrders = response.filter(
              (order: Order) => order.status === 'ready'
            );
            console.log('Pending Orders:', this.pendingOrders);
            console.log('Completed Orders:', this.completedOrders);
          },
          (error) => {
            console.error('Erro ao buscar pedidos', error);
          }
        );
   
  }

  markOrderAsReady(order: Order) {

    this.orderService.updateOrder(order, 'ready').subscribe( 
      ()=> {
        console.log('Order updated');
        this.loadOrders(true);
      },
      (error) => {
        console.error(error)
      }  
    )
    
  }
}
