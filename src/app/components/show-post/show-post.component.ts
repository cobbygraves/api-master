import { Component, OnInit } from '@angular/core';
import { PostServiceService } from '../../services/post-service.service';
import { Post } from '../../models/post';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-show-post',
  imports: [],
  templateUrl: './show-post.component.html',
  styleUrl: './show-post.component.css',
})
export class ShowPostComponent implements OnInit {
  singlePost: Post | null = null;
  postComments: Comment[] | null = null;

  constructor(
    private postService: PostServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id')!;
    console.log(postId);
    this.singlePost = this.postService.getSinglePost(parseInt(postId))!;

    this.postService.getPostComments(postId).subscribe({
      next: (value) => {
        this.postComments = value;
      },
    });
  }
}
