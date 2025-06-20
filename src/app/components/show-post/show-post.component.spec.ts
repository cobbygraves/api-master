import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowPostComponent } from './show-post.component';
import { PostServiceService } from '../../services/post-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('ShowPostComponent', () => {
  let component: ShowPostComponent;
  let fixture: ComponentFixture<ShowPostComponent>;
  let mockPostService: jasmine.SpyObj<PostServiceService>;

  beforeEach(async () => {
    mockPostService = jasmine.createSpyObj('PostServiceService', [
      'getSinglePost',
      'getPostComments',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ShowPostComponent, // if standalone
        HttpClientTestingModule,
      ],
      providers: [
        { provide: PostServiceService, useValue: mockPostService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1', // Simulate route param `id=1`
              },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowPostComponent);
    component = fixture.componentInstance;

    // Mock return values
    mockPostService.getSinglePost.and.returnValue({
      id: 1,
      title: 'Test Post',
    } as any);
    mockPostService.getPostComments.and.returnValue(
      of([{ id: 1, content: 'Nice!' }] as any)
    );

    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should fetch the post and comments on init', () => {
    expect(component.singlePost).toEqual(jasmine.objectContaining({ id: 1 }));
    expect(component.postComments?.length).toBe(1);
  });
});
