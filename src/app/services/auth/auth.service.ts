import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private url = 'http://localhost:8080/login';

  constructor(private http: HttpClient, private router:Router) { }
  async login (email: string, password: string) {
    try {
      const userData = { email: email, password: password };
      const response = await firstValueFrom(this.http.post<any>(this.url, userData))
      console.log(response)
      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('user', JSON.stringify(response.user));
        return true;
      } else {
        throw new Error('Login inválido');
      }
    
  }catch (error) {
    console.error('Erro ao fazer login:', error);
    throw new Error('Erro ao fazer login. Por favor, tente novamente.');
  }
}
  // verifica se usuário está logado ou não
  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // pegar o email do usuário logado
  getUserEmail(): string | null { //indicar que um determinado valor ou variável pode ser de mais de um tipo.
    return localStorage.getItem('userEmail');
  }
  getUserData(): any | null { 
    const user: any | null = localStorage.getItem('user');
    return JSON.parse(user);
  }

  // Armazenar o token no localStorage se efetuar login com sucesso
  storageToken(token: string) {
    return localStorage.setItem('token', token);
  }

  // Remover o token e o email do usuario após logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    console.log('Logout com sucesso');
    this.router.navigate(['login']); // Redireciona para a página de login ou outra página desejada após o logout.
  }
}
