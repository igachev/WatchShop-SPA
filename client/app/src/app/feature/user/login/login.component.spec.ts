import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { UserService } from 'src/app/core/services/user.service';
import { SpinnerBootstrapComponent } from 'src/app/shared/spinner-bootstrap/spinner-bootstrap.component';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { USERS } from 'src/app/mockData/users';
import { HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let el: DebugElement;
  let router: Router;

  beforeEach(() => {

    mockUserService = jasmine.createSpyObj('UserService',['login'])
    mockToastService = jasmine.createSpyObj('ToastService',['showToast','status'])

    TestBed.configureTestingModule({
      declarations: [LoginComponent,SpinnerBootstrapComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ToastService, useValue: mockToastService },
      ],
      imports: [FormsModule,SharedModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    mockToastService.status = new BehaviorSubject<any>(null)
    fixture.detectChanges();

    el = fixture.debugElement;
    router = TestBed.inject(Router);
  });

  it('should call userService login method and on successful login redirect to /watches page', fakeAsync(() => {
    const myForm = {
      value: {
        email: 'ivan@abv.bg',
        password: '1234'
      }
    };

    spyOn(router, 'navigate');

    mockUserService.login.and.returnValue(of(myForm.value))
    component.login(myForm as NgForm)
    tick()
    expect(mockUserService.login).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalledWith(['/watches'])
    expect(mockToastService.showToast).not.toHaveBeenCalled()
    expect(myForm.value.email).toBe(USERS[0].email)
    expect(myForm.value.password).toBe(USERS[0].password)
  }));

  it('should throw server side error when login with invalid user details',fakeAsync(() => {
    const myForm = {
      value: {
        email: 'stoqn@abv.bg',
        password: '1234'
      }
    };

    const serverSideError = new HttpErrorResponse({
      error: { message: 'Invalid email or password'},
      status: 400
    })

    spyOn(router, 'navigate');

    mockUserService.login.and.returnValue(throwError(serverSideError))
    component.login(myForm as NgForm)
    tick()
    expect(mockUserService.login).toHaveBeenCalled()
    expect(router.navigate).not.toHaveBeenCalledWith(['/watches'])
    expect(mockToastService.showToast).toHaveBeenCalledWith('error',serverSideError.error.message,true)
  }))

  it('should have only one button called Login', () => {
    const buttons = el.queryAll(By.css('button'))
    expect(buttons.length).toBe(1)
    expect(buttons[0].nativeElement.textContent).toBe('Login')
  })

  it('should have only two input fields', () => {
    const inputs = el.queryAll(By.css('input'))
    expect(inputs.length).toBe(2)
  })

});
