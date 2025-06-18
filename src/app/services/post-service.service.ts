import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Post } from '../models/post';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  http = inject(HttpClient);
  allPosts = signal<Post[]>([]);

  constructor() {
    this.getAllPosts().subscribe({
      next: (value) => {
        // console.log(value);
        this.allPosts.set(value);
      },
    });
    // effect(() => {
    //   console.log(this.allPosts());
    // });
  }

  getAllPosts() {
    return this.http.get<Post[]>(`${environment.baseURL}/posts`);
  }

  getSinglePost(id: number | null) {
    return this.http.get<Post>(`${environment.baseURL}/posts/${id}`);
  }

  getPostComments(id: string | undefined) {
    return this.http.get<Comment[]>(
      `${environment.baseURL}/comments?postId=${id}`
    );
  }

  updatePost(post: Post, id: string | undefined) {
    return this.http.put(`${environment.baseURL}/posts/${id}`, post);
  }

  addPost(post: Post) {
    return this.http.post(`${environment.baseURL}/posts`, post);
  }

  deletePost(id: string | undefined) {
    return this.http.delete(`${environment.baseURL}/posts/${id}`);
  }
}
