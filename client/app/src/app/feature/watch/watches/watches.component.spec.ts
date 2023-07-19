import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchesComponent } from './watches.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { WatchService } from '../../../core/services/watch.service';
import { UserService } from '../../../core/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { NgxPaginationModule, PaginatePipe, PaginationService } from 'ngx-pagination';
import { WATCHES } from '../../../mockData/watches';
import { ActivatedRoute, RouterModule, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

fdescribe('WatchesComponent', () => {
  let component: WatchesComponent;
  let fixture: ComponentFixture<WatchesComponent>;
  let watchService: WatchService;
  let userService: UserService;
  let el: DebugElement;
  let mockLocalStorage: { [key: string]: string } = {};

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

    mockLocalStorage = {};
 spyOn(localStorage, 'getItem').and.callFake((key: string) => {
    return mockLocalStorage[key] || null;
  });

  spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
    mockLocalStorage[key] = value;
  });

  spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
    delete mockLocalStorage[key];
  });

  spyOn(localStorage, 'clear').and.callFake(() => {
    mockLocalStorage = {};
  });
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

  it('guest user should see the message:You must be logged in to buy',() => {
    component.watches = WATCHES
    fixture.detectChanges()
    const smallElements = fixture.debugElement.queryAll(By.css('small'))
    const isLogged = userService.isLogged()
    expect(isLogged).toBeFalse()
    expect(smallElements[0].nativeElement.textContent).toBe('You must be logged in to buy')
  })

  it('logged in user should not see the message:You must be logged in to buy',() => {
    component.watches = WATCHES
    localStorage.setItem('accessToken','123')
    fixture.detectChanges()
    const smallElements = fixture.debugElement.queryAll(By.css('small'))
    const isLogged = userService.isLogged()
    expect(isLogged).toBeTrue()
    expect(smallElements[0]).toBeUndefined()
  })
});
