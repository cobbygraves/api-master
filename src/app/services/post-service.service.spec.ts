import { TestBed } from '@angular/core/testing';
import { PostServiceService } from './post-service.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('PostServiceService', () => {
  let service: PostServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostServiceService],
    });

    service = TestBed.inject(PostServiceService);
    httpMock = TestBed.inject(HttpTestingController);

    const req = httpMock.expectOne(`${environment.baseURL}/posts`);
    req.flush([]); // or mock data
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all posts from API', () => {
    const dummyPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ] as any;

    service.getAllPosts()?.subscribe((posts) => {
      expect(posts).toEqual(dummyPosts);
    });

    const req = httpMock.expectOne(`${environment.baseURL}/posts`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyPosts);
  });
});
