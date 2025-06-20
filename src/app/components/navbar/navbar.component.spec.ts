import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NavbarComponent, // ✅ Standalone component goes here
        RouterTestingModule,
      ],
      schemas: [NO_ERRORS_SCHEMA], // To ignore unknown elements
    });

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should emit showNewFormEvent when handleNewPost is called', () => {
    spyOn(component.showNewFormEvent, 'emit');
    component.handleNewPost();
    expect(component.showNewFormEvent.emit).toHaveBeenCalled();
  });

  it('should remove authToken from localStorage on logout', () => {
    localStorage.setItem('authToken', 'test-token');
    component.handleLogOut();
    expect(localStorage.getItem('authToken')).toBeNull();
  });

  it('should navigate to login on logout', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.handleLogOut();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  });
});
