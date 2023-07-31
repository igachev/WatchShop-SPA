import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AllPurchaseHistoryComponent } from './all-purchase-history.component';
import { UserService } from 'src/app/core/services/user.service';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { SpinnerBootstrapComponent } from 'src/app/shared/spinner-bootstrap/spinner-bootstrap.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { By } from '@angular/platform-browser';
import { IPurchaseHistory } from 'src/app/shared/interfaces/IPurchaseHistory';

fdescribe('AllPurchaseHistoryComponent', () => {
  let component: AllPurchaseHistoryComponent;
  let fixture: ComponentFixture<AllPurchaseHistoryComponent>;

  let mockUserService: jasmine.SpyObj<UserService>;
  let el: DebugElement;

  beforeEach(() => {

    mockUserService = jasmine.createSpyObj('UserService',['getAllPurchaseHistory'])

    TestBed.configureTestingModule({
      declarations: [AllPurchaseHistoryComponent,SpinnerBootstrapComponent],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
      imports: [SharedModule]
    });
    fixture = TestBed.createComponent(AllPurchaseHistoryComponent);
    mockUserService.getAllPurchaseHistory.and.returnValues(of([]))
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it("if no purchases should display 'No Purchases Yet'", () => {
    expect(mockUserService.getAllPurchaseHistory).toHaveBeenCalled()
    expect(component.allPurchaseHistoryItems.length).toBe(0);
    const h3Element = el.query(By.css('h3'))
    expect(h3Element.nativeElement.textContent).toBe('No Purchases Yet')
  });

it('if there are purchases should display correct allPurchaseHistoryItems',fakeAsync(() => {
  const mockAllPurchases: IPurchaseHistory[] = [
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

  mockUserService.getAllPurchaseHistory.and.returnValues(of(mockAllPurchases))
  component.getAllPurchaseHistory()
  tick()

  expect(mockUserService.getAllPurchaseHistory).toHaveBeenCalled()
  expect(component.allPurchaseHistoryItems.length).toBe(1)
  expect(component.allPurchaseHistoryItems).toEqual(mockAllPurchases)
}))

});
