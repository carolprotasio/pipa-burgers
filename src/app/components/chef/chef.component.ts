import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

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
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    /* this.loadOrders(true); */
  }

  loadOrders(isPending: boolean) {
    console.log('loadOrders called with isPending:', isPending);
    this.showPendingOrders = isPending;
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      this.http
        .get<Order[]>('http://localhost:8080/orders', { headers })
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
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }

  markOrderAsReady(order: Order) {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const updatedOrder = {
        ...order,
        status: 'ready',
        completedDate: new Date().toLocaleDateString(),
      };

      this.http
        .patch<any>(`http://localhost:8080/orders/${order.id}`, updatedOrder, {
          headers,
        })
        .subscribe(
          () => {
            console.log('Pedido marcado como pronto.');
            // Recarregue a lista de pedidos após marcar como pronto.
            this.loadOrders(this.showPendingOrders);
          },
          (error) => {
            console.error('Erro ao marcar pedido como pronto', error);
          }
        );
    } else {
      console.error('Token de autenticação não encontrado.');
    }
  }
}
