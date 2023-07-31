import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { ToastService } from 'src/app/core/services/toast.service';
import { DebugElement } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';

fdescribe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  let mockToastService: jasmine.SpyObj<ToastService>;
  let el: DebugElement;

  beforeEach(() => {

    mockToastService = jasmine.createSpyObj('ToastService',['status','showToast'])

    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        { provide: ToastService, useValue: mockToastService },
      ]
    });
    fixture = TestBed.createComponent(ToastComponent);
    mockToastService.status = new BehaviorSubject<any>(null)
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it('should display success toast message',fakeAsync(() => {
    spyOn(localStorage,'getItem').and.returnValue('success')
    mockToastService.status.next('successful message');
    
    tick();
    
    expect(component.toastType).toBe('success')
    expect(component.toastMessage).toBe('successful message')
    expect(component.showToast).toBe(true)
  }));

  it('should display error toast message',fakeAsync(() => {
    spyOn(localStorage,'getItem').and.returnValue('error')
    mockToastService.status.next('error message');
  
    tick();
    
    expect(component.toastType).toBe('error')
    expect(component.toastMessage).toBe('error message')
    expect(component.showToast).toBe(true)
  }));

  it('should display warning toast message',fakeAsync(() => {
    spyOn(localStorage,'getItem').and.returnValue('warn')
    mockToastService.status.next('warning message');
  
    tick();
    
    expect(component.toastType).toBe('warn')
    expect(component.toastMessage).toBe('warning message')
    expect(component.showToast).toBe(true)
  }));

  it('should display information toast message',fakeAsync(() => {
    spyOn(localStorage,'getItem').and.returnValue('info')
    mockToastService.status.next('information message');
  
    tick();
    
    expect(component.toastType).toBe('info')
    expect(component.toastMessage).toBe('information message')
    expect(component.showToast).toBe(true)
  }));

  it('should not display toast message if message value is null',fakeAsync(() => {
    spyOn(localStorage,'getItem').and.returnValue('success')
    mockToastService.status.next(null);
  
    tick();
    
    expect(component.toastType).toBe('success')
    expect(component.toastMessage).toBe('')
    expect(component.showToast).toBe(false)
  }));
});
