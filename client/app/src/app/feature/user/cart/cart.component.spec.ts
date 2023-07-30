import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { UserService } from 'src/app/core/services/user.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { DebugElement } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BehaviorSubject, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { IWatch } from 'src/app/shared/interfaces/IWatch';
import { WATCHES } from 'src/app/mockData/watches';
import { USERS } from 'src/app/mockData/users';

fdescribe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let el: DebugElement;

  beforeEach(() => {

    mockUserService = jasmine.createSpyObj('UserService',['getCart','deleteCartItem','addToUserPurchaseHistory'])
    mockToastService = jasmine.createSpyObj('ToastService',['showToast','status'])

    TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: ToastService, useValue: mockToastService },
      ],
      imports: [FormsModule,SharedModule]
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;

    mockUserService.getCart.and.returnValue(of([]))
    mockToastService.status = new BehaviorSubject<any>(null)
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it("if cart is empty should display 'Your Cart Is Empty'", () => {
    expect(component.cartItems.length).toBe(0);
    let h2Elements = el.queryAll(By.css('h2'))
    expect(h2Elements[0].nativeElement.textContent).toBe('Your Cart Is Empty')
  });

  it('should display cart items if any', fakeAsync(() => {
    mockUserService.getCart.and.returnValue(of([

      {
        _id:'3',
        brand:'Seiko',
        model:'Master',
        image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        battery:'n/a',
        mechanism:"mechanical",
        price:400,
        strap:'plastic',
        glass:'mineral',
        waterResistance:'n/a',
        rating: [
        
        ]
      }

    ]));

    component.getCart()
    tick()
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0]).toEqual(WATCHES[2])
  }));

  it('should remove an item from cart', fakeAsync(() => {
   mockUserService.deleteCartItem.and.returnValue(of('cart item removed'))
   spyOn(window, 'confirm').and.returnValue(true);
   component.deleteCartItem('3')
   
   tick()
   expect(mockUserService.deleteCartItem).toHaveBeenCalled()
    expect(mockToastService.showToast).toHaveBeenCalledWith('success','Item Removed',true)
  }))

  it('should buy an watch and remove it from cart', fakeAsync(() => {
    const myForm:any = {
      value: {
        name: 'ivan',
        phone: '1234567890',
        address: 'Varna',
        quantity: 1
      }
    };

    const watchId = '3'
    const price = 200

    spyOn(localStorage, 'getItem').and.returnValue('3');
    spyOn(myForm, 'value').and.returnValue(myForm.value);

    mockUserService.addToUserPurchaseHistory.and.returnValue(of(USERS[1]));
    mockUserService.deleteCartItem.and.returnValue(of('cart item removed'));

    component.buy(myForm as NgForm, watchId, price);
    tick();

    expect(mockToastService.showToast).toHaveBeenCalledWith('success', 'Item Was Purchased', true);
    expect(mockUserService.getCart).toHaveBeenCalled()
  }))

});
