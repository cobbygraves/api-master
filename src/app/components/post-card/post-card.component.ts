import { Component, input, output } from '@angular/core';
import { Post } from '../../models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  post = input<Post>();

  editHandler = output<number | undefined>();
  deleteHandler = output<number | undefined>();

  constructor(private router: Router) {}

  viewPostHandler(id: number | undefined) {
    this.router.navigate(['post', id]);
  }
  editPostHandler(id: number | undefined) {
    this.editHandler.emit(id);
  }

  confirmDelete(id: number | undefined) {
    this.deleteHandler.emit(id);
  }
}
