import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

fdescribe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;
  let el: DebugElement;
  let router: Router;

  beforeEach(() => {

    mockUserService = jasmine.createSpyObj('UserService',['isLogged','isAdmin','logout'])


    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
    router = TestBed.inject(Router);
  });

  it('guest user should see correct navigation', () => {
    mockUserService.isLogged.and.returnValue(false)
    mockUserService.isAdmin.and.returnValue(false)
    fixture.detectChanges()
    const navLinks = el.queryAll(By.css('a'))
    expect(navLinks.length).toBe(7)
    expect(navLinks[0].children[0].nativeNode.src).toBe('https://images.unsplash.com/photo-1575203091586-611fe505bb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')
    expect(navLinks[1].nativeElement.textContent).toBe('Catalog')
    expect(navLinks[2].nativeElement.textContent).toBe('Contacts')
    expect(navLinks[3].nativeElement.textContent).toBe('About us')
    expect(navLinks[4].nativeElement.textContent).toBe('Search')
    expect(navLinks[5].nativeElement.textContent).toBe('Login')
    expect(navLinks[6].nativeElement.textContent).toBe('Register')
  });

  it('logged in user should see correct navigation', () => {
    mockUserService.isLogged.and.returnValue(true)
    mockUserService.isAdmin.and.returnValue(false)
    fixture.detectChanges()
    const navLinks = el.queryAll(By.css('a'))
    expect(navLinks.length).toBe(8)
    expect(navLinks[0].children[0].nativeNode.src).toBe('https://images.unsplash.com/photo-1575203091586-611fe505bb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')
    expect(navLinks[1].nativeElement.textContent).toBe('Catalog')
    expect(navLinks[2].nativeElement.textContent).toBe('Contacts')
    expect(navLinks[3].nativeElement.textContent).toBe('About us')
    expect(navLinks[4].nativeElement.textContent).toBe('Search')
    expect(navLinks[5].nativeElement.textContent).toBe('Cart')
    expect(navLinks[6].nativeElement.textContent).toBe('Purchase History')
    expect(navLinks[7].nativeElement.textContent).toBe('Logout')
  });

  it('admin user should see correct navigation', () => {
    mockUserService.isLogged.and.returnValue(true)
    mockUserService.isAdmin.and.returnValue(true)
    fixture.detectChanges()
    const navLinks = el.queryAll(By.css('a'))
    expect(navLinks.length).toBe(8)
    expect(navLinks[0].children[0].nativeNode.src).toBe('https://images.unsplash.com/photo-1575203091586-611fe505bb0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')
    expect(navLinks[1].nativeElement.textContent).toBe('Catalog')
    expect(navLinks[2].nativeElement.textContent).toBe('Contacts')
    expect(navLinks[3].nativeElement.textContent).toBe('About us')
    expect(navLinks[4].nativeElement.textContent).toBe('Search')
    expect(navLinks[5].nativeElement.textContent).toBe('All Purchase History')
    expect(navLinks[6].nativeElement.textContent).toBe('Logout')
    expect(navLinks[7].nativeElement.textContent).toBe('Create Product')
  });
});
