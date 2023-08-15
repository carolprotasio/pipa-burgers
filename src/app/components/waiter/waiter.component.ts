import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-waiter',
  templateUrl: './waiter.component.html',
  styleUrls: ['./waiter.component.css']
})
export class WaiterComponent {
  filterProducts: any[] = [];
  productType: string = 'café da manhã';
  listProduct?: any[] = [];
  orderProducts: any[] = []; 
  totalValue: number = 0;
  customerName: string = ''; 
  loggedInUsername: string = ''; 
 

  constructor(
    private router: Router, 
    private authService: AuthService,
    private productService: ProductService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.filterProductsByType(this.productType);
    
    this.loggedInUsername = 'Carol Protásio';
  }

  filterProductsByType(type: string) {
    this.productType = type;

    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.filterProducts = data.filter((product: any) => product.type === this.productType);
      },
      (error) => {
        console.error('Erro ao obter produtos:', error);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

  selectProduct(product: any) {
    this.listProduct = [...(this.listProduct || []), { product: product, qty: 1 }];
    console.log(this.listProduct);
    this.calculateTotalValue();
    this.cdRef.detectChanges();
    
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
      this.orderProducts.push(...this.listProduct);
      this.listProduct = [];
      this.calculateTotalValue();
  }
  }

  removeFromOrder(product: any) {
    const index = this.orderProducts.indexOf(product);
    if (index !== -1) {
      this.orderProducts.splice(index, 1);
      this.calculateTotalValue();
    }
  }

  calculateTotalValue() {
    this.totalValue = this.orderProducts.reduce((total, product) => {
      return total + product.qty * product.product.price;
    }, 0);
  }

  placeOrder() {
    
    console.log('Order placed:', this.orderProducts);
    console.log('Total:', this.totalValue);
    console.log('Customer Name:', this.customerName);
    console.log('Waiter:', this.loggedInUsername);

    //reset
    this.orderProducts = [];
    this.totalValue = 0;
    this.customerName = '';
    /* this.listProduct = null; */
  }
}
