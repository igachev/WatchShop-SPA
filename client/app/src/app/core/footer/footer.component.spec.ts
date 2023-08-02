import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { DebugElement } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { SubscribeService } from '../services/subscribe.service';
import { FormsModule, NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

fdescribe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  let mockSubscribeService: jasmine.SpyObj<SubscribeService>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let el: DebugElement;

  beforeEach(() => {

    mockSubscribeService = jasmine.createSpyObj('SubscribeService',['sendEmail'])
    mockToastService = jasmine.createSpyObj('ToastService',['showToast','status'])

    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      providers: [
        {provide: SubscribeService, useValue: mockSubscribeService},
        {provide: ToastService, useValue: mockToastService}
      ],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it('should call subscribeService.sendEmail and successfully send an email',fakeAsync(() => {
    const myForm:any = {
      reset: jasmine.createSpy('reset'),
      value: {
        subscriptionEmail: 'ivo@abv.bg'
      }
    };

    mockSubscribeService.sendEmail.and.returnValue(of(myForm.value))
    component.sendEmail(myForm as NgForm)
    tick()

    expect(mockSubscribeService.sendEmail).toHaveBeenCalledWith('ivo@abv.bg')
    expect(myForm.reset).toHaveBeenCalled()
    expect(mockToastService.showToast).toHaveBeenCalledWith('info','Email sent',true)
  }));

  it('should throw server side error if email is invalid', fakeAsync(() => {
    const myForm:any = {
      reset: jasmine.createSpy('reset'),
      value: {
        subscriptionEmail: 'ivo'
      }
    };

    const serverSideError = new HttpErrorResponse({
      error: { message: 'Invalid Email'},
      status: 400
    });

    mockSubscribeService.sendEmail.and.returnValue(throwError(serverSideError))
    component.sendEmail(myForm as NgForm)
    tick()

    expect(mockSubscribeService.sendEmail).toHaveBeenCalledWith('ivo')
    expect(mockToastService.showToast).toHaveBeenCalledWith('error','Invalid Email',true)
  }))

  it('should have only 1 input field', () => {
    const inputFields = el.queryAll(By.css('input'))
    expect(inputFields.length).toBe(1)
  })

  it('should have only 1 button called Subscribe',() => {
    const btns = el.queryAll(By.css('button'))
    expect(btns.length).toBe(1)
    expect(btns[0].nativeElement.textContent).toBe('Subscribe') 
  })

});
