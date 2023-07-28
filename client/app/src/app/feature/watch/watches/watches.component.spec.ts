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
import { SharedModule } from 'src/app/shared/shared.module';

fdescribe('WatchesComponent', () => {
  let component: WatchesComponent;
  let fixture: ComponentFixture<WatchesComponent>;
  let mockWatchService: jasmine.SpyObj<WatchService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let el: DebugElement;

  beforeEach(() => {

    let mockActivatedRoute = {
      snapshot: {
        params: {
          watchId: ['1','2','3','4','5']
        }
      }
    }

    mockWatchService = jasmine.createSpyObj('WatchService',['getAll'])
    mockUserService = jasmine.createSpyObj('UserService',['isLogged','isAdmin'])

    TestBed.configureTestingModule({
      declarations: [WatchesComponent,ToastComponent, PaginatePipe],
      providers: [
        PaginationService,
        { provide: WatchService , useValue: mockWatchService },
        { provide: UserService, useValue: mockUserService },
        { provide:ActivatedRoute , useValue: mockActivatedRoute },
      ],
      imports: [HttpClientModule,NgxPaginationModule,RouterModule,SharedModule] 
    });

    fixture = TestBed.createComponent(WatchesComponent);
    component = fixture.componentInstance;
    mockWatchService.getAll.and.returnValue(of(WATCHES))
    fixture.detectChanges();
    el = fixture.debugElement;
    
  });


  it('should have correct h2 text content', () => {
    let h2Element = el.query(By.css('h2'))
    expect(h2Element.nativeElement.textContent).toBe('All Products')
    expect(h2Element.nativeElement.textContent).not.toBe('')
    expect(h2Element.nativeElement.textContent).not.toBe('something else')
    expect(h2Element.nativeElement.textContent).not.toBe(2)
  });

  it('should consist of 5 or less watches because pagination limit is 5',() => {
    let cardElements = el.queryAll(By.css('.card'))
    expect(cardElements.length).toBeLessThanOrEqual(5)
    expect(cardElements.length).not.toBe(6)
    expect(cardElements.length).not.toBe(-1)
  })

  it('guest user should see the message:You must be logged in to buy',() => {
   mockUserService.isLogged.and.returnValue(false)
    fixture.detectChanges()
    const smallElements = el.queryAll(By.css('small'))
    expect(smallElements[0].nativeElement.textContent).toBe('You must be logged in to buy')
  })

  it('logged in user should not see the message:You must be logged in to buy',() => {
    mockUserService.isLogged.and.returnValue(true)
    fixture.detectChanges()
    const smallElements = el.queryAll(By.css('small'))
    expect(smallElements[0]).toBeUndefined()
  })

  it('the first watch card should display correct watch card details', () => {
    const firstWatchCardImg = el.query(By.css('.card .card-img-top'))
    expect(firstWatchCardImg.nativeElement.src).toBe('https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=742&q=80')
    const firstWatchBrandAndModel = el.queryAll(By.css('.card-title'))
    expect(firstWatchBrandAndModel[0].nativeElement.textContent).toBe('Brand: Casio')
    expect(firstWatchBrandAndModel[1].nativeElement.textContent).toBe('Model: G-Shock')
    const firstWatchPrice = el.queryAll(By.css('.card-text'))
    expect(firstWatchPrice[0].nativeElement.textContent).toBe('Price: €200.00')
  })

  it('should see correct pagination (only 2 pages for 6 watches)', () => {
    const spans = el.queryAll(By.css('span'))
    expect(spans[4].nativeElement.textContent).toBe('1')
    expect(spans[6].nativeElement.textContent).toBe('2')
  })
});
