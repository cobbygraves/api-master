import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostServiceService } from './services/post-service.service';
import { Post } from './models/post';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  postService = inject(PostServiceService);

  showCreateModal = false;

  constructor() {}

  newPost: Post = {
    id: this.postService.allPosts.length + 1,
    title: '',
    userId: '23',
    body: '',
  };

  handleNewPost() {
    this.postService.addPost(this.newPost).subscribe({
      next: (value) => console.log(value),
    });
    this.closeNewModal();
  }

  closeNewModal() {
    this.showCreateModal = false;
  }

  openNewModal() {
    this.showCreateModal = true;
  }
}
