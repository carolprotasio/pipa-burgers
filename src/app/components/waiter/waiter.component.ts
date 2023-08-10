import { Component } from '@angular/core';
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

  constructor(
    private router: Router, 
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.filterProductsByType(this.productType);
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
}
