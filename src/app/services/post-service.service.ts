import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Post } from '../models/post';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  http = inject(HttpClient);
  allPosts = signal<Post[]>([]);

  constructor() {
    this.getAllPosts().subscribe({
      next: (value) => {
        if (this.allPosts().length > 0) {
          return;
        } else {
          this.allPosts.set(value);
        }
      },
    });
  }

  getAllPosts() {
    return this.http.get<Post[]>(`${environment.baseURL}/posts`).pipe(retry(3));
  }

  getSinglePost(id: number | null) {
    return this.allPosts().find((post) => post.id === id);
  }

  getPostComments(id: string | undefined) {
    return this.http
      .get<Comment[]>(`${environment.baseURL}/comments?postId=${id}`)
      .pipe(retry(3));
  }

  updatePost(post: Post, id: string) {
    if (Number(id) > 100) {
      return null;
    } else {
      return this.http
        .put(`${environment.baseURL}/posts/${id}`, post)
        .pipe(retry(3));
    }
  }

  addPost(post: Post) {
    return this.http.post(`${environment.baseURL}/posts`, post).pipe(retry(3));
  }

  deletePost(id: string | undefined) {
    return this.http
      .delete(`${environment.baseURL}/posts/${id}`)
      .pipe(retry(3));
  }
}
