import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ProductService } from '../../services/products/products.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  selectedCategory: string = 'lanches';
  displayedItems: any[] = [];
  itemQuantities: { [itemId: number ]: number} = {}

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getMenuItems();
  }

  getMenuItems() {
    this.productService.getProducts().subscribe(
      (data) => {
        this.menuItems = data;
        this.filterItemsByCategory(this.selectedCategory);
        this.quantItems();
      },
      (error) => {
        console.error('Erro ao obter produtos da API:', error);
      }
    );
  }

  filterItemsByCategory(category: string){
    this.selectedCategory = category;
    this.displayedItems = this.menuItems.filter(item => item.type === category);
  }

  quantItems() {
    this.menuItems.forEach(item => {
      this.itemQuantities[item.id] = 0;
    });
  }

  addItem(itemId: number){
    this.itemQuantities[itemId]++;
  }

  removeItem(itemId: number){
    if (this.itemQuantities[itemId] > 0){
      this.itemQuantities[itemId]--;
    }
  }
}
