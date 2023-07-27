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

    mockWatchService.getOne.and.returnValue(of({
      _id:'1',
      brand:'Casio',
      model:'G-Shock',
      image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=742&q=80',
      battery:'5v',
      mechanism:"quartz",
      price:200,
      strap:'rubber',
      glass:'mineral',
      waterResistance:'30 ATM',
      rating: [
          {          
  userId:"64ad27025a3776a02491bf3a",
  userRating:4,
  _id:'64ad27185a3776a02491bf41'
          }
      ]
    
  } as IWatch ))

  mockWatchService.getRating.and.returnValue(of(4))
  mockToastService.status = new BehaviorSubject<any>(null)
  mockUserService.isLogged.and.returnValue(false)
  mockUserService.isAdmin.and.returnValue(false)

    fixture.detectChanges();

    el = fixture.debugElement;
  });



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

});