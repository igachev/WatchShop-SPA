import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PurchaseHistoryComponent } from './purchase-history.component';
import { UserService } from 'src/app/core/services/user.service';
import { DebugElement } from '@angular/core';
import { SpinnerBootstrapComponent } from 'src/app/shared/spinner-bootstrap/spinner-bootstrap.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { IPurchaseHistory } from 'src/app/shared/interfaces/IPurchaseHistory';

fdescribe('PurchaseHistoryComponent', () => {
  let component: PurchaseHistoryComponent;
  let fixture: ComponentFixture<PurchaseHistoryComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;
  let el: DebugElement;

  beforeEach(() => {

    mockUserService = jasmine.createSpyObj('UserService',['getPurchaseHistory'])

    TestBed.configureTestingModule({
      declarations: [PurchaseHistoryComponent,SpinnerBootstrapComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(PurchaseHistoryComponent);

    mockUserService.getPurchaseHistory.and.returnValues(of([]))
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it("if no purchases should display 'You haven't bought anything yet'", () => {
    const h3Element = el.query(By.css('h3'))
    expect(component.purchaseHistoryItems.length).toBe(0)
    expect(h3Element.nativeElement.textContent).toBe("You haven't bought anything yet")
  });

  it('if there are purchases should display correct purchaseHistoryItems',fakeAsync(() => {
    const mockPurchase: IPurchaseHistory[] = [
      {
        watchId:{
          _id:'2',
          brand:'Casio',
          model:'g-shock'
  },
  quantity:1,
  totalSum:500,
  name:'ivan',
  phone:'1234567890',
  address:'burgas',
  _id:'456',
  date:"2023-07-11T10:13:51.057+00:00",
      }
    ];

    mockUserService.getPurchaseHistory.and.returnValues(of(mockPurchase))
    component.getPurchaseHistory()
    tick()

    expect(mockUserService.getPurchaseHistory).toHaveBeenCalled()
    expect(component.purchaseHistoryItems.length).toBe(1)
    expect(component.purchaseHistoryItems).toEqual(mockPurchase)
  }))
});
