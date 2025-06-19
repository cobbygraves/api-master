import { Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { ShowPostComponent } from './components/show-post/show-post.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'home',
    component: PostsComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'post/:id',
    component: ShowPostComponent,
    canActivate: [AuthGuard],
  },
];
