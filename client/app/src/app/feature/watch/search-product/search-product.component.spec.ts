import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductComponent } from './search-product.component';
import { WatchService } from 'src/app/core/services/watch.service';
import { UserService } from 'src/app/core/services/user.service';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerBootstrapComponent } from 'src/app/shared/spinner-bootstrap/spinner-bootstrap.component';
import { FormsModule } from '@angular/forms';
import {  of } from 'rxjs';
import { WATCHES } from 'src/app/mockData/watches';
import { By } from '@angular/platform-browser';

fdescribe('SearchProductComponent', () => {
  let component: SearchProductComponent;
  let fixture: ComponentFixture<SearchProductComponent>;

  let mockWatchService: jasmine.SpyObj<WatchService>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let el: DebugElement;

  beforeEach(() => {

    let mockActivatedRoute = {
      snapshot: {
        params: {
          watchId: ['1','2','3','4','5','6']
        }
      }
    }

    mockWatchService = jasmine.createSpyObj('WatchService',['getAll','search'])
    mockUserService = jasmine.createSpyObj('UserService',['isLogged','isAdmin'])

    TestBed.configureTestingModule({
      declarations: [SearchProductComponent,SpinnerBootstrapComponent],
      providers: [
        { provide: WatchService , useValue: mockWatchService },
        { provide: UserService, useValue: mockUserService },
        { provide:ActivatedRoute , useValue: mockActivatedRoute },
      ],
      imports: [
        HttpClientModule,RouterModule,FormsModule
      ]
    });
    fixture = TestBed.createComponent(SearchProductComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    mockWatchService.getAll.and.returnValue(of(WATCHES))
    fixture.detectChanges();
  });

  it('should load all watches initially', () => {
    expect(component.watches).toEqual(WATCHES)
    let watches = el.queryAll(By.css('.card'))
    expect(watches.length).toBe(6)
  })

  it('should display only the searched watches by brand',() => {
    const filterBrand = 'Casio'
    const filteredWatches = WATCHES.filter((watch) => watch.brand.toLowerCase() == filterBrand.toLowerCase())
    mockWatchService.search.and.returnValue(of(filteredWatches))
    
    component.watches = filteredWatches
    fixture.detectChanges()
    
    expect(component.watches.length).toBe(2)
    expect(component.watches).toEqual(filteredWatches)
    let watches = el.queryAll(By.css('.card'))
    expect(watches.length).toBe(2)
  })

  it("should display 'No results found!' if there is no match", () => {
    const filterBrand = 'Certina'
    const filteredWatches = WATCHES.filter((watch) => watch.brand.toLowerCase() == filterBrand.toLowerCase())
    mockWatchService.search.and.returnValue(of(filteredWatches))
    
    component.watches = filteredWatches
    fixture.detectChanges()

    expect(component.watches.length).toBe(0)
    let text = el.query(By.css('h5'))
    expect(text.nativeElement.textContent).toBe('No results found!')
  })

});
