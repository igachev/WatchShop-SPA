import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsComponent } from './details.component';
import { WatchService } from 'src/app/core/services/watch.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { SpinnerBootstrapComponent } from 'src/app/shared/spinner-bootstrap/spinner-bootstrap.component';
import { BehaviorSubject, of } from 'rxjs';
import { IWatch } from 'src/app/shared/interfaces/IWatch';
import { RatingComponent } from '../rating/rating.component';
import { ToastComponent } from 'src/app/shared/toast/toast.component';
import { NgbRating, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WATCHES } from 'src/app/mockData/watches';


fdescribe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let el: DebugElement;

  let mockWatchService: jasmine.SpyObj<WatchService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let mockToastService: jasmine.SpyObj<ToastService>;

  beforeEach(() => {

    let mockActivatedRoute = {
      snapshot: {
        params: {
          watchId:'1'
        }
      }
    }

    mockWatchService = jasmine.createSpyObj('WatchService',['getOne','getRating'])
    mockToastService = jasmine.createSpyObj('ToastService',['status'])
    mockUserService = jasmine.createSpyObj('UserService',['isLogged','isAdmin'])

    TestBed.configureTestingModule({
      declarations: [DetailsComponent,SpinnerBootstrapComponent,RatingComponent,ToastComponent],
      providers: [
        { provide: WatchService , useValue: mockWatchService },
        { provide: UserService, useValue: mockUserService },
        { provide: ToastService, useValue: mockToastService },
        { provide:ActivatedRoute , useValue: mockActivatedRoute },
      ],
      imports: [NgbRatingModule, FormsModule, ReactiveFormsModule,RouterModule]
    });
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;

    mockWatchService.getOne.and.returnValue(of(WATCHES[0] as IWatch ))

  mockWatchService.getRating.and.returnValue(of(4))
  mockToastService.status = new BehaviorSubject<any>(null)
  mockUserService.isLogged.and.returnValue(false)
  mockUserService.isAdmin.and.returnValue(false)

    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it('should see correct watch details', () => {
    const watchBrand = el.query(By.css('.card-title'))
    const watchDetails = el.queryAll(By.css('p'))
    expect(watchBrand.nativeElement.textContent).toBe('Brand: Casio')
    expect(watchDetails[0].nativeElement.textContent).toBe('Model: G-Shock')
    expect(watchDetails[1].nativeElement.textContent).toBe('Battery: 5v')
    expect(watchDetails[2].nativeElement.textContent).toBe('Mechanism: quartz')
    expect(watchDetails[3].nativeElement.textContent).toBe('Price: €200.00')
    expect(watchDetails[4].nativeElement.textContent).toBe('Strap: rubber')
    expect(watchDetails[5].nativeElement.textContent).toBe('Glass: mineral')
    expect(watchDetails[6].nativeElement.textContent).toBe('Water Resistance: 30 ATM')
    expect(watchDetails[8].nativeElement.textContent).toContain('Average Rating: (*)★(*)★(*)★(*)★( )☆ 4.00')
  })

  it('guest user should not see any buttons', () => {
    let allBtns = el.queryAll(By.css('a'))
    expect(allBtns.length).toBe(0)
    expect(allBtns.length).not.toBe(1)
  })


  it("guest user should see text 'You must be logged in to buy'",() => {
    const smallElement = el.queryAll(By.css('p'))
    expect(smallElement[smallElement.length-1].nativeElement.textContent).toBe('You must be logged in to buy')
  })

  it('logged in user should see button Add To Cart', () => {
    mockUserService.isLogged.and.returnValue(true);
  fixture.detectChanges();
  let allBtns = el.queryAll(By.css('a'))
  expect(allBtns.length).toBe(1)
  expect(allBtns[0].nativeElement.textContent).toBe('Add To Cart')
  })

  it("logged in user should not see text 'You must be logged in to buy'",() => {
  mockUserService.isLogged.and.returnValue(true)
    fixture.detectChanges();
    const smallElement = el.queryAll(By.css('p'))
    expect(smallElement[smallElement.length-1].nativeElement.textContent).not.toBe('You must be logged in to buy')
  })

  it('logged in user should not see Edit and Delete buttons', () => {
    mockUserService.isLogged.and.returnValue(true)
    fixture.detectChanges();
    const ownerBtns = el.query(By.css('.owner-btns'))
      expect(ownerBtns).toBeNull()
  })


  it('admin should see buttons Edit and Delete', () => {
    mockUserService.isLogged.and.returnValue(true)
    mockUserService.isAdmin.and.returnValue(true)
    fixture.detectChanges()
    const btns = el.queryAll(By.css('a'))
    expect(btns.length).toBe(2)
    expect(btns[0].nativeElement.textContent).toBe('Edit')
    expect(btns[1].nativeElement.textContent).toBe('Delete')
  })

  it('admin should not see button Add To Cart', () => {
    mockUserService.isLogged.and.returnValue(true)
    mockUserService.isAdmin.and.returnValue(true)
    fixture.detectChanges()
    const btns = el.queryAll(By.css('a'))
    expect(btns.length).toBe(2)
    expect(btns[0].nativeElement.textContent).not.toBe('Add To Cart')
    expect(btns[1].nativeElement.textContent).not.toBe('Add To Cart')
  })

  it("admin should not see text 'You must be logged in to buy'",() => {
    mockUserService.isLogged.and.returnValue(true)
    mockUserService.isAdmin.and.returnValue(true)
    fixture.detectChanges();
    const smallElement = el.queryAll(By.css('p'))
    expect(smallElement[smallElement.length-1].nativeElement.textContent).not.toBe('You must be logged in to buy')
    })
});