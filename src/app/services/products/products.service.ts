import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly URL: string = "http://localhost:8080"

  constructor(private readonly http: HttpClient) { }

  getProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.URL}/products`, { headers });
    } else {
      
      return new Observable(); 
    }
  }

/*   getProducts(): Observable<any> {
    console.log('Chamando getProducts()')
    return this.http.get(`${this.URL}/products`)
    
  } */

}