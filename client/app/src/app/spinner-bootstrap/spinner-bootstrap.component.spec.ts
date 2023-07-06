import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerBootstrapComponent } from './spinner-bootstrap.component';

describe('SpinnerBootstrapComponent', () => {
  let component: SpinnerBootstrapComponent;
  let fixture: ComponentFixture<SpinnerBootstrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerBootstrapComponent]
    });
    fixture = TestBed.createComponent(SpinnerBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
