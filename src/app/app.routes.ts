import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { ShowPostComponent } from './components/show-post/show-post.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: PostsComponent,
  },

  {
    path: 'post/:id',
    component: ShowPostComponent,
  },
];
