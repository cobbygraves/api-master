import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsComponent } from './posts.component';
import { PostServiceService } from '../../services/post-service.service';
import { of } from 'rxjs';
import { Post } from '../../models/post';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let postService: jasmine.SpyObj<PostServiceService>;

  const mockPosts: Post[] = [
    { id: 1, title: 'Test Post', body: 'Test Content', userId: '1' },
  ];

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostServiceService', [
      'getAllPosts',
      'allPosts',
    ]);
    postServiceSpy.getAllPosts.and.returnValue(of(mockPosts));
    postServiceSpy.allPosts.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [],
      providers: [{ provide: PostServiceService, useValue: postServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(
      PostServiceService
    ) as jasmine.SpyObj<PostServiceService>;
    fixture.detectChanges();
  });

  it('should fetch posts on initialization', () => {
    expect(postService.getAllPosts).toHaveBeenCalled();
    expect(localStorage.getItem('authToken')).toBeTruthy();
    expect(component.errorMessage).toBe('');
  });
});
