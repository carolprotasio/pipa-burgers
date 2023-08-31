import { Component, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() listProduct: any[] = [];
  @Input() totalValue: number = 0;
  orderProducts: any[] = [];
  @Input() loggedInUsername: string = '';
  @Output() sendOrder: EventEmitter<any> = new EventEmitter<any>();
  customerName: string = '';
  successMessageVisible = false;
  successMessage = '';

  constructor(
    private cdRef: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnChanges(changes: any) {
    console.log(changes.listProduct.currentValue);
    this.calculateTotalValue();
  }

  incrementQty(product: any) {
    product.qty++;
    this.calculateTotalValue();
  }

  decrementQty(product: any) {
    if (product.qty > 1) {
      product.qty--;
      this.calculateTotalValue();
    }
  }

  removeItem(product: any) {
    const index = this.listProduct?.indexOf(product);
    if (index !== undefined && index !== -1) {
      this.listProduct?.splice(index, 1);
      this.calculateTotalValue();
    }
  }

  addToOrder() {
    if (this.listProduct && this.listProduct.length > 0) {
      const token = localStorage.getItem('token');
      this.customerName = (document.getElementById('customerName') as HTMLInputElement).value;

      if (token) {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`
        });

        const order = {
          waiter: this.loggedInUsername,
          client: this.customerName,
          status: 'pending',
          completedDate: '',
          orderDelivered: '',
          products: this.listProduct.map(item => {
            return {
              name: item.product.name,
              quantity: item.quantity
            };            
          })
        };

        this.http.post('http://localhost:8080/orders', order, { headers }).subscribe(
          (response: any) => {
            console.log('Pedido enviado com sucesso:', response);
            /* this.orderProducts = []; */
            this.customerName = '';
            this.totalValue = 0;
            this.cdRef.detectChanges();
            
            this.sendOrder.emit();
            
            console.log(this.orderProducts)
            console.log(this.listProduct)
            this.calculateTotalValue();
            this.openSuccessMessage();

            
          },
          (error: any) => {
            console.error('Erro ao enviar pedido para a API:', error);
          }
        );
      } else {
        console.error('Token de autenticação não encontrado.');
      }
    }
  }

  resetOrder() {
    this.listProduct = [];
    this.totalValue = 0;
  }

  openSuccessMessage() {
    this.successMessageVisible = true;
    this.successMessage = 'Pedido enviado com sucesso!';

    setTimeout(() => {
      this.successMessageVisible = false;
      this.successMessage = '';
      this.resetOrder();
    }, 1000);
  }

  calculateTotalValue() {
    this.totalValue = this.listProduct.reduce((total: number, product: any) => {
      return total + product.qty * product.product.price;
    }, 0);
  }
}
