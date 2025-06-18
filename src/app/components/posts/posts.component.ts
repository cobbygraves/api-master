import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../post-card/post-card.component';
import { Post } from '../../models/post';
import { PostServiceService } from '../../services/post-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posts',
  imports: [PostCardComponent, FormsModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  id: number | undefined = 0;
  showEditModal = false;
  singlePost: Post = { id: 0, title: '', userId: '', body: '' };
  postService = inject(PostServiceService);
  showDeleteModal = false;

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getAllPosts().subscribe({
      next: (value: Post[]) => (this.posts = value),
    });
  }

  handleEditPost(id: number | undefined) {
    this.showEditModal = true;
    this.postService.getSinglePost(id ?? null).subscribe({
      next: (value: Post) => {
        this.singlePost = value;
      },
    });
  }

  handleDeletePost(id: number | undefined) {
    this.showDeleteModal = true;
    this.postService.deletePost(id?.toString()).subscribe({
      next: (value) => console.log(value),
    });
  }

  handleSavePost() {
    this.postService
      .updatePost(this.singlePost, this.singlePost.id.toString())
      .subscribe({
        next: (value) => console.log(value),
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
    this.closeDeleteModal();
  }
}
