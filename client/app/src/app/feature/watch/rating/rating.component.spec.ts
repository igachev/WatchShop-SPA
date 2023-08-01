import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { RatingComponent } from './rating.component';
import { WatchService } from 'src/app/core/services/watch.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { DebugElement } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { WATCHES } from 'src/app/mockData/watches';
import { HttpErrorResponse } from '@angular/common/http';

fdescribe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  let mockWatchService: jasmine.SpyObj<WatchService>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let mockUserService: jasmine.SpyObj<UserService>;

  let el: DebugElement;

  beforeEach(() => {

 let mockActivatedRoute = {
      snapshot: {
        params: {
          watchId:'1'
        }
      }
    }

    mockWatchService = jasmine.createSpyObj('WatchService',['getRating','rate'])
    mockUserService = jasmine.createSpyObj('UserService',['isLogged','isAdmin'])
    mockToastService = jasmine.createSpyObj('ToastService',['showToast','status'])

    TestBed.configureTestingModule({
      declarations: [RatingComponent],
      providers: [
        { provide: WatchService , useValue: mockWatchService },
        { provide: UserService, useValue: mockUserService },
        { provide: ToastService, useValue: mockToastService },
        { provide:ActivatedRoute , useValue: mockActivatedRoute },
      ],
      imports: [NgbRatingModule,ReactiveFormsModule,RouterModule]
    });
    fixture = TestBed.createComponent(RatingComponent);
    mockUserService.isLogged.and.returnValue(true)
    mockWatchService.getRating.and.returnValue(of(0))

    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it('initial getRating before a watch being rated should be 0', fakeAsync(() => {
    mockWatchService.getRating.and.returnValue(of(0))
    component.getRating()
    tick()
    expect(mockWatchService.getRating).toHaveBeenCalled()
    expect(component.averageRating).toBeInstanceOf(Number)
    expect(component.averageRating).toBe(0)

  }));

  it('should call watchService.rate,rate a watch successfully,update getRating value',fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('1');
    component.ratingControl.setValue(1)
    mockWatchService.rate.and.returnValue(of(WATCHES[0]))
    mockWatchService.getRating.and.returnValue(of(2.5))
    component.addRating()
    
    tick()
    expect(mockWatchService.rate).toHaveBeenCalledWith('1','1',1)
    expect(component.message).toBe('Thanks For Voting!')
    expect(mockToastService.showToast).toHaveBeenCalledWith('info','Thanks For Voting!',true)
    expect(mockWatchService.getRating).toHaveBeenCalled()
    expect(component.averageRating).toBe(2.5)
  }))

  it('should throw server side error if try to rate same watch more than once',fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('1');
    component.ratingControl.setValue(1)

    const serverSideError = new HttpErrorResponse({
      error: { message: 'User already rate'},
      status: 400
    })

    mockWatchService.rate.and.returnValue(throwError(serverSideError))
    component.addRating()
    tick()

    expect(mockWatchService.rate).toHaveBeenCalledWith('1','1',1)
    expect(mockToastService.showToast).toHaveBeenCalledWith('error',serverSideError.error.message,true)
  }))

});
