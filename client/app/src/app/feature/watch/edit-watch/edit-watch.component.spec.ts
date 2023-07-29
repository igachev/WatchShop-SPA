import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditWatchComponent } from './edit-watch.component';
import { WatchService } from 'src/app/core/services/watch.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerBootstrapComponent } from 'src/app/shared/spinner-bootstrap/spinner-bootstrap.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { WATCHES } from 'src/app/mockData/watches';
import { HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

fdescribe('EditWatchComponent', () => {
  let component: EditWatchComponent;
  let fixture: ComponentFixture<EditWatchComponent>;

  let mockWatchService: jasmine.SpyObj<WatchService>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let el: DebugElement;
  let router: Router

  beforeEach(() => {

    let mockActivatedRoute = {
      snapshot: {
        params: {
          watchId:'1'
        }
      }
    }

    mockWatchService = jasmine.createSpyObj('WatchService',['getOne','editOne'])
    mockToastService = jasmine.createSpyObj('ToastService',['showToast','status'])

    TestBed.configureTestingModule({
      declarations: [EditWatchComponent,SpinnerBootstrapComponent],
      providers: [
        { provide: WatchService, useValue: mockWatchService },
        { provide: ToastService, useValue: mockToastService },
        { provide:ActivatedRoute , useValue: mockActivatedRoute },
      ],
      imports: [FormsModule,SharedModule]
    });
    fixture = TestBed.createComponent(EditWatchComponent);
    component = fixture.componentInstance;

    mockWatchService.getOne.and.returnValue(of(WATCHES[0]))
    mockToastService.status = new BehaviorSubject<any>(null)
    fixture.detectChanges();

    el = fixture.debugElement;
    router = TestBed.inject(Router);
  });

  it('should populate input fields with correct watch details', () => {
    expect(mockWatchService.getOne).toHaveBeenCalled();
    expect(component.brandValue).toBe('Casio')
    expect(component.modelValue).toBe('G-Shock')
    expect(component.imageValue).toBe('https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=742&q=80')
    expect(component.batteryValue).toBe('5v')
    expect(component.mechanismValue).toBe('quartz')
    expect(component.priceValue).toBe(200)
    expect(component.strapValue).toBe('rubber')
    expect(component.glassValue).toBe('mineral')
    expect(component.waterResistanceValue).toBe('30 ATM')
  });

  it('should call watchService edit method,edit watch details and redirect back to the edited watch',fakeAsync(() => {
    const myForm = {
      value: {
        brand:'Casio',
        model:'G-Shock',
        image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=742&q=80',
        battery:'5v',
        mechanism:"quartz",
        price:250,
        strap:'rubber',
        glass:'sapphire',
        waterResistance:'20 ATM'
      },
    };

    spyOn(router, 'navigate');

    mockWatchService.editOne.and.returnValue(of(myForm.value))
    component.edit(myForm as any)
    tick()
    expect(mockWatchService.editOne).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/watches/1/details'])
    expect(mockToastService.showToast).toHaveBeenCalledWith('success', 'Edit was successful', true);
  }))

  it('should throw server side error when edit form values are invalid',fakeAsync(() => {
    const myForm = {
      value: {
        brand:'',
        model:'G-Shock',
        image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=742&q=80',
        battery:'5v',
        mechanism:"quartz",
        price:250,
        strap:'rubber',
        glass:'sapphire',
        waterResistance:'20 ATM'
      },
    };

    const serverSideError = new HttpErrorResponse({
      error: { message: 'brand is required'},
      status: 400
    })

    spyOn(router, 'navigate');

    mockWatchService.editOne.and.returnValue(throwError(serverSideError))
    component.edit(myForm as any)
    tick()
    expect(mockWatchService.editOne).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalledWith(['/watches/1/details'])
    expect(mockToastService.showToast).toHaveBeenCalledWith('error',serverSideError.error.message,true)
  }))

  it('should have only one button called Edit', () => {
    const buttons = el.queryAll(By.css('button'))
    expect(buttons.length).toBe(1)
    expect(buttons[0].nativeElement.textContent).toBe('Edit')
  })

});
