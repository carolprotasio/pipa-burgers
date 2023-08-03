import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  login() {
    
    const admEmail = 'admin@example.com';
    const admPassword = '123456';

    if (this.email === admEmail && this.password === admPassword) {
      console.log('Login com sucesso');
      // Aqui você pode redirecionar para a página do respectivo usuário (adm / chef / atendente)
      // Exemplo: this.router.navigate(['/adm']) ou this.router.navigate(['/chef']) ou this.router.navigate(['/atendente'])
    } else {
      console.error('Email ou senha inválidos');
      this.errorMessage = 'Email ou senha inválidos. Tente de novo!';

      this.email = '';
      this.password = '';
    }
  }
}

