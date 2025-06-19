import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { Post } from '../../models/post';
import { PostServiceService } from '../../services/post-service.service';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-posts',
  imports: [PostCardComponent, FormsModule, ErrorComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  // posts: Post[] = [];
  id: number | undefined = 0;
  showEditModal = false;
  singlePost: Post = { id: 0, title: '', userId: '', body: '' };
  postService = inject(PostServiceService);
  showDeleteModal = false;
  errorMessage = '';

  ngOnInit(): void {
    const mockToken = 'mocked-jwt-token-123456';
    localStorage.setItem('authToken', mockToken);
    this.getPosts();
  }

  getPosts() {
    this.postService.getAllPosts()?.subscribe({
      next: (value: Post[]) => {
        if (this.postService.allPosts().length > 0) {
          return;
        } else {
          this.postService.allPosts.set(value);
        }
      },
      error: (error: string) => (this.errorMessage = error),
    });
  }

  handleEditPost(id: number | undefined) {
    this.showEditModal = true;

    // this.singlePost = value;
    // const allPost = this.postService.allPosts();
    const selectedPost = this.postService.getSinglePost(id ?? null);
    this.singlePost = selectedPost!;
  }

  handleDeletePost(id: number | undefined) {
    this.showDeleteModal = true;
    this.id = id;
  }

  handleUpdatePost() {
    this.postService
      .updatePost(this.singlePost, this.singlePost.id.toString())
      ?.subscribe({
        next: (value) => {
          const allPost = this.postService.allPosts();
          const updatedPosts = allPost.map((post: Post) =>
            post.id !== this.singlePost.id
              ? post
              : {
                  ...post,
                  title: this.singlePost.title,
                  body: this.singlePost.body,
                }
          );
          this.postService.allPosts.set(updatedPosts);

          alert(
            `Post with id: ${this.singlePost.id} has been updated successfully`
          );
        },
        error: (error: string) => (this.errorMessage = error),
      });
    this.closeModal();
  }

  closeModal() {
    this.showEditModal = false;
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    this.postService.deletePost(this.id?.toString()).subscribe({
      next: (value) => {
        const allPost = this.postService.allPosts();
        const filteredPosts = allPost.filter(
          (post: Post) => post.id != this.id
        );
        this.postService.allPosts.set(filteredPosts);
        alert(`Post with id: ${this.id} has been deleted successfully`);
      },

      error: (error: string) => (this.errorMessage = error),
    });
    this.closeDeleteModal();
  }

  handleCloseError() {
    this.errorMessage = '';
  }
}
