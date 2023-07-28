import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CreateProductComponent } from './create-product.component';
import { WatchService } from 'src/app/core/services/watch.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { DebugElement } from '@angular/core';
import { SpinnerBootstrapComponent } from 'src/app/shared/spinner-bootstrap/spinner-bootstrap.component';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

fdescribe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;

  let mockWatchService: jasmine.SpyObj<WatchService>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let el: DebugElement;

  beforeEach(() => {

    mockWatchService = jasmine.createSpyObj('WatchService',['create'])
    mockToastService = jasmine.createSpyObj('ToastService',['showToast','status'])

    TestBed.configureTestingModule({
      declarations: [CreateProductComponent,SpinnerBootstrapComponent,ToastComponent],
      providers: [
        { provide: WatchService, useValue: mockWatchService },
        { provide: ToastService, useValue: mockToastService },
      ],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;

    mockToastService.status = new BehaviorSubject<any>(null)

    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('create watch form should consist of the following inputs:brand,model,image,battery.mechanism,price,strap,glass,waterResistance',() => {
    const brandInput = el.query(By.css('#brand'))
    const modelInput = el.query(By.css('#model'))
    const imageInput = el.query(By.css('#image'))
    const batteryInput = el.query(By.css('#battery'))
    const mechanismInput = el.query(By.css('#mechanism'))
    const priceInput = el.query(By.css('#price'))
    const strapInput = el.query(By.css('#strap'))
    const glassInput = el.query(By.css('#glass'))
    const waterResistanceInput = el.query(By.css('#waterResistance'))
    
    expect(brandInput).toBeDefined();
    expect(modelInput).toBeDefined();
    expect(imageInput).toBeDefined();
    expect(batteryInput).toBeDefined();
    expect(mechanismInput).toBeDefined();
    expect(priceInput).toBeDefined();
    expect(strapInput).toBeDefined();
    expect(glassInput).toBeDefined();
    expect(waterResistanceInput).toBeDefined();
  })

  it('should call WatchService create method and reset form on successful create', fakeAsync(() => {
    
    const myForm = {
      reset: jasmine.createSpy('reset'),
      value: {
        brand: 'Rolex',
        model: 's-300',
        image: 'sample-image-url',
        battery: '3v',
        mechanism: 'quartz',
        price: 2000,
        strap: 'rubber',
        glass: 'mineral',
        waterResistance: '5 ATM',
      },
    };

    mockWatchService.create.and.returnValue(of(myForm.value));
    component.create(myForm as any);
    tick();

    expect(mockWatchService.create).toHaveBeenCalled();
    expect(myForm.reset).toHaveBeenCalled();
    expect(mockToastService.showToast).toHaveBeenCalledWith('success', 'Successfully added new product', true);
  }));

  it('should throw server side error when form values are invalid', fakeAsync(() => {
    const myForm = {
      reset: jasmine.createSpy('reset'),
      value: {
        brand: '',
        model: 'g-200',
        image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=742&q=80',
        battery: 'no',
        mechanism: 'mechanical',
        price: 300,
        strap: 'metal',
        glass: 'minetal',
        waterResistance: 'no',
      },
    };

    const serverSideError = new HttpErrorResponse({
      error: { message: 'brand is required'},
      status: 400
    })

    mockWatchService.create.and.returnValue(throwError(serverSideError));
    component.create(myForm as any);
    tick();

    expect(mockWatchService.create).toHaveBeenCalled()
    expect(myForm.reset).not.toHaveBeenCalled()
    expect(mockToastService.showToast).toHaveBeenCalledWith('error',serverSideError.error.message,true)
  }))

});
