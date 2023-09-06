import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  selectedList: string = 'list';
  users: any[] = [];
  saveCancelVisible: {[userId: number]: boolean} = {};
  selectedPosition: string = '';
  employeeData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlUsers = 'http://localhost:8080/users';
      this.http.get<any[]>(apiUrlUsers, { headers }).subscribe((data) => {
        this.users = data;
        for (const user of data) {
          user.editing = false;
        }
      },
      (error) => {
        console.error('Erro ao obter usuarios da API:', error);
      });
    }
  }
  toggleEdit(user: any) {
    user.editing = !user.editing;
    this.saveCancelVisible[user.id] = user.editing;
  }
  cancelEdit(user: any) {
    user.editing = false;
    this.saveCancelVisible[user.id] = false;
  }

  onViewChange() {
    if (this.selectedList === 'list') {
      this.getUsers();
    }
  }

  updateUsersData(user: any) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlUsers = `http://localhost:8080/users/${user.id}`;
      this.http.patch<any[]>(apiUrlUsers, user, { headers }).subscribe((response) => {
        user.editing = false;
      },
      (error) => {
        console.error('Erro ao atualizar dados', error);
      });
    }
  }
  deleteUser(user: any) {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlUsers = `http://localhost:8080/users/${user.id}`;
      this.http.delete<any[]>(apiUrlUsers, { headers }).subscribe(() => {
        this.users = this.users.filter(u => u.id !== user.id);
      },
      (error) => {
        console.error('Erro ao excluir usuário', error);
      });
    }
  }

  deleteUserConfirmation(user: any) {
    user.showConfirmation = true;
  }

  cancelDeleteConfirmation(user: any) {
    user.showConfirmation = false;
  }

  registerUsers() {
    const token = localStorage.getItem('token');

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const apiUrlUsers = 'http://localhost:8080/users/users';
      const data = {
        ...this.employeeData,
        role: this.selectedPosition
      };
      this.http.post<any[]>(apiUrlUsers, data, { headers }).subscribe((response)=> {
        this.employeeData = {
          name: '',
          email: '',
          password: ''
        };
        this.selectedPosition = '';
      },
      (error) => {
        console.error('Erro ao cadastrar funcionário:', error);
      });
    }
  }

  
}
