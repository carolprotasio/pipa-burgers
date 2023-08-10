import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

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
      console.log(success)
      if (success) {        
        const user = this.authService.getUserData();
        console.log(user)
        switch (user.role) {
          case 'admin':
            this.router.navigate(['/admin']);
            break;
          case 'chef':
            this.router.navigate(['/chef']);
            break;
          case 'atendente':
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