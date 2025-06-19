import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  constructor(private router: Router) {}

  login() {
    const mockToken = 'mocked-jwt-token-123456';
    localStorage.setItem('authToken', mockToken);
    this.router.navigate(['/home']);
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
