import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router) {}
  @Output() showNewFormEvent = new EventEmitter<void>();

  handleNewPost() {
    this.showNewFormEvent.emit();
  }

  handleLogOut() {
    localStorage.removeItem('authToken');
    this.router.navigate(['login']);
  }
}
