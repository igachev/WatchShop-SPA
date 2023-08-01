import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { UserService } from 'src/app/core/services/user.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

fdescribe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let el: DebugElement;
  let router: Router;

  beforeEach(() => {

    mockUserService = jasmine.createSpyObj('UserService',['register'])
    mockToastService = jasmine.createSpyObj('ToastService',['showToast','status'])

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ToastService, useValue: mockToastService },
      ],
      imports: [FormsModule,SharedModule]
    });
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    mockToastService.status = new BehaviorSubject<any>(null)
    fixture.detectChanges();

    el = fixture.debugElement;
    router = TestBed.inject(Router);
  });

  it('should call userService register method and on successful user registration to redirect to /login page', fakeAsync(() => {
    const myForm = {
      value: {
        email: 'hristo@abv.bg',
        password: '1234',
        repeatPassword: '1234'
      }
    };

    spyOn(router, 'navigate');

    mockUserService.register.and.returnValue(of(myForm.value))
    component.register(myForm as NgForm)
    tick()

    expect(mockUserService.register).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalledWith(['/users/login'])
    expect(mockToastService.showToast).not.toHaveBeenCalled()
  }))

  it('should throw server side error when password and repeatPassword do not match', fakeAsync(() => {
    const myForm = {
      value: {
        email: 'hristo@abv.bg',
        password: '1234',
        repeatPassword: '12'
      }
    };

    const serverSideError = new HttpErrorResponse({
      error: { message: 'passwords missmatch!'},
      status: 400
    })

    spyOn(router, 'navigate');

    mockUserService.register.and.returnValue(throwError(serverSideError))
    component.register(myForm as NgForm)
    tick()

    expect(mockUserService.register).toHaveBeenCalled()
    expect(router.navigate).not.toHaveBeenCalledWith(['/login'])
    expect(mockToastService.showToast).toHaveBeenCalledWith('error',serverSideError.error.message,true)
  }))

  it('should have only one button called Register', () => {
    const buttons = el.queryAll(By.css('button'))
    expect(buttons.length).toBe(1)
    expect(buttons[0].nativeElement.textContent).toBe('Register')
  })

  it('should have only three input fields', () => {
    const inputs = el.queryAll(By.css('input'))
    expect(inputs.length).toBe(3)
  })
});
