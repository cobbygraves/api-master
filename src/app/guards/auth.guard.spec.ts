import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: routerSpy }],
    });
    guard = TestBed.inject(AuthGuard);
    localStorage.clear();
  });

  it('should allow activation if token exists', () => {
    localStorage.setItem('authToken', 'mock-token');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should block activation and redirect if token does not exist', () => {
    expect(guard.canActivate()).toBeFalse();
  });
});
