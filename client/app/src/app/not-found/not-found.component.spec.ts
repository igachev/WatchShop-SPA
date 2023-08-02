import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundComponent]
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it('should have correct h1 text content', () => {
    const h1Element = el.query(By.css('h1'))
    expect(h1Element.nativeElement.textContent).toBe('404')
  });

  it('should have correct h2 text content', () => {
    const h1Element = el.query(By.css('h2'))
    expect(h1Element.nativeElement.textContent).toBe('Page Not Found')
  });

  it('should have only 1 image', () => {
    const images = el.queryAll(By.css('img'))
    expect(images.length).toBe(1)
  })
});
