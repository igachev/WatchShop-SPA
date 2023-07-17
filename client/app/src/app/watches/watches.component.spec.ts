import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchesComponent } from './watches.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { WatchService } from '../services/watch.service';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from '../toast/toast.component';
import { NgxPaginationModule, PaginatePipe, PaginationService } from 'ngx-pagination';
import { WATCHES } from '../mockData/watches';
import { ActivatedRoute, RouterModule, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

fdescribe('WatchesComponent', () => {
  let component: WatchesComponent;
  let fixture: ComponentFixture<WatchesComponent>;
  let watchService: WatchService;
  let userService: UserService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WatchesComponent,ToastComponent, PaginatePipe],
      providers: [
        WatchService,
        UserService,
        PaginationService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}) // Provide an empty paramMap
            },
            queryParams: of({}) // Provide an empty object for queryParams
          }
        }
      ],
      imports: [HttpClientModule,NgxPaginationModule,RouterModule] 
    });
    watchService = TestBed.inject(WatchService)
    userService = TestBed.inject(UserService)
    fixture = TestBed.createComponent(WatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct h2 text content', () => {
    let h2Element = el.query(By.css('h2'))
    expect(h2Element.nativeElement.textContent).toBe('All Products')
    expect(h2Element.nativeElement.textContent).not.toBe('')
    expect(h2Element.nativeElement.textContent).not.toBe('something else')
    expect(h2Element.nativeElement.textContent).not.toBe(2)
  });

  it('should consist of 5 or less detail cards because pagination limit is 5',() => {
    component.watches = WATCHES
    fixture.detectChanges()
    let cardElements = el.queryAll(By.css('.card'))
    expect(cardElements.length).toBe(5)
    expect(cardElements.length).not.toBe(6)
    expect(cardElements.length).not.toBe(-1)
  })
});
