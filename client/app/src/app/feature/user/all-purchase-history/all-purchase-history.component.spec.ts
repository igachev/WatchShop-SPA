import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPurchaseHistoryComponent } from './all-purchase-history.component';

describe('AllPurchaseHistoryComponent', () => {
  let component: AllPurchaseHistoryComponent;
  let fixture: ComponentFixture<AllPurchaseHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPurchaseHistoryComponent]
    });
    fixture = TestBed.createComponent(AllPurchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
