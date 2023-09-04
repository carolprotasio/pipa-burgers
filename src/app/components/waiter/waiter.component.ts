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
    
    this.loggedInUsername = this.authService.getUserEmail() ?? '';
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

  selectProduct(product: any) {
    this.listProduct = [...(this.listProduct || []), { product: {...product, quantity: 1} }];
    console.log(this.listProduct);
    this.calculateTotalValue();
    this.cdRef.detectChanges();
    
  }


  calculateTotalValue() {
    this.totalValue = this.orderProducts.reduce((total, product) => {
      return total + product.product.quantity * product.product.price;
    }, 0);
  }

  resetOrder() {
    this.listProduct = [];
    this.totalValue = 0;
    console.log("Resetando a order");
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }


}
