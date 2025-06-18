import { Component, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  showNewFormEvent = output();

  handleNewPost() {
    this.showNewFormEvent.emit();
  }
}
