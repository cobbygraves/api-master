import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authService = inject(AuthService);
  username = '';
  email = '';

  constructor(private fb: FormBuilder, private router: Router) {
    const auth = localStorage.getItem('authToken');
    if (auth) {
      this.onLogin();
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required, Validators.minLength(3)],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onLogin() {
    this.authService.login();
  }
}
