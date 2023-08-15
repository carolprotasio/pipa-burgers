import { Component, Input, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() listProduct: any[] = [];
  @Input() totalValue: number = 0;
  orderProducts: any[] = []; 
  

  constructor(
    private cdRef: ChangeDetectorRef
  ) {}

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
      this.orderProducts.push(...this.listProduct);
      this.listProduct = [];
      console.log('Order Products:', this.orderProducts);
      this.calculateTotalValue();
      this.cdRef.detectChanges();
  }
  }

  calculateTotalValue() {
    this.totalValue = this.listProduct.reduce((total: number, product: any) => {
      return total + product.qty * product.product.price;
      
    }, 0);
  }
}
