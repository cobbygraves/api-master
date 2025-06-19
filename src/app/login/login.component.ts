import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  username = '';
  email = '';

  constructor() {
    const auth = localStorage.getItem('authToken');
    if (auth) {
      this.onLogin();
    }
  }

  onLogin() {
    this.authService.login();
  }
}
