import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  activeComponent: string = 'users';
  
  showEmployees() {
    this.activeComponent = 'users';
  }

  showProducts() {
    this.activeComponent = 'products';
  }

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redireciona para a página de login após o logout
  }

}
