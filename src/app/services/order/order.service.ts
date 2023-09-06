import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly URL = "http://localhost:8080/orders"

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {

  }

  private authenticate(): string | null { 
    const token: string | null = localStorage.getItem('token');
    return token      

  }

  updateOrder(order: any, newStatus: string): Observable<any> {
    const token = this.authenticate()

    if(!token){
      this.router.navigate(['/'])

    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    
    let updatedOrder = {
      ...order,
      status: newStatus,
      
    }; 
    if(newStatus === 'ready'){
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
      updatedOrder.completedDate = formattedDate;
    }
    return this.http.patch<any>(`${this.URL}/${order.id}`, updatedOrder, { headers })

  }
  getOrders() {
    const token = this.authenticate()

    if(!token){
      this.router.navigate(['/'])

    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    
      return this.http
        .get<Order[]>(`${this.URL}`, { headers })
       
    
  }
  
}