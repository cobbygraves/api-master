import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Post } from '../models/post';
import { environment } from '../../environments/environment';
import { Comment } from '../models/comment';
import { retry, tap } from 'rxjs';
import { Cache } from '../models/cache';

@Injectable({
  providedIn: 'root',
})
export class PostServiceService {
  http = inject(HttpClient);
  allPosts = signal<Post[]>([]);
  cache = new Map<string, Cache>();
  defaultCacheDuration = 7000 * 60;
  constructor() {
    this.getAllPosts(1)?.subscribe({
      next: (value) => {
        if (this.allPosts().length > 0) {
          return;
        } else {
          this.allPosts.set(value);
        }
      },
    });
  }

  getAllPosts(pageNo: number) {
    const cachedData = this.cache.get(`${environment.baseURL}/posts`) as Cache;
    const isValid = Date.now();

    if (cachedData && cachedData.expiry < isValid) {
      return this.allPosts.set(cachedData.data);
    } else {
      console.log('calling post from API...');
      return this.http
        .get<Post[]>(
          `${environment.baseURL}/posts?_start=${[pageNo]}&_limit=${10}`
        )
        .pipe(
          retry(3),
          tap((data) => {
            this.cache.set(`${environment.baseURL}/posts`, {
              expiry: this.defaultCacheDuration + Date.now(),
              data: data,
            });
          })
        );
    }
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
