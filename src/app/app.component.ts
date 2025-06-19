import { Component, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostServiceService } from './services/post-service.service';
import { Post } from './models/post';
import { NavbarComponent } from './components/navbar/navbar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  postService = inject(PostServiceService);
  showCreateModal = false;
  isLoginPage = false;
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isLoginPage = event.urlAfterRedirects === '/login';
      });
  }

  newPost: Post = {
    id: this.postService.allPosts.length + 1,
    title: '',
    userId: '0',
    body: '',
  };

  handleNewPost() {
    this.postService.addPost(this.newPost).subscribe({
      next: (value: any) => {
        alert(`A new post with id: ${value?.id} has been added successfully`);
        this.postService.allPosts.set([
          {
            id: value?.id,
            title: this.newPost.title,
            userId: this.newPost.userId,
            body: this.newPost.body,
          },
          ...this.postService.allPosts(),
        ]);
      },
    });

    this.closeNewModal();
  }

  closeNewModal() {
    this.showCreateModal = false;
  }

  openNewModal() {
    if (this.newPost.title) {
      this.newPost.title = '';
      this.newPost.body = '';
    }
    this.showCreateModal = true;
  }
}
