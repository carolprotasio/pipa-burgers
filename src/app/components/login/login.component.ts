import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async login() {
    try {
      const success = await this.authService.login(this.email, this.password);
      
      if (success) {
        const userEmail = this.authService.getUserEmail();
        switch (userEmail) {
          case 'admin@pb.com':
            this.router.navigate(['/admin']);
            break;
          case 'chef@pb.com':
            this.router.navigate(['/chef']);
            break;
          case 'waiter@pb.com':
            this.router.navigate(['/waiter']);
            break;
          default:
            this.router.navigate(['']);
            break;
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      this.errorMessage = 'Erro ao fazer login. Por favor, tente novamente.';
      this.email = '';
      this.password = '';
    }
  }
}