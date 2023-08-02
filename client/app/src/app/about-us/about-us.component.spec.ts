import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsComponent } from './about-us.component';
import { DebugElement } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

fdescribe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AboutUsComponent],
      imports: [NgbCarouselModule]
    });
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it('should have 6 images', () => {
    const images = el.queryAll(By.css('img'))
    expect(images.length).toBe(6)
  });

  it('should use ngb-carousel', () => {
    const ngbCarousel = el.query(By.css('ngb-carousel'))
    expect(ngbCarousel).toBeDefined()
  })
});
