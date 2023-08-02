import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsComponent } from './contacts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('ContactsComponent', () => {
  let component: ContactsComponent;
  let fixture: ComponentFixture<ContactsComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactsComponent],
      imports: [FontAwesomeModule]
    });
    fixture = TestBed.createComponent(ContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement;
  });

  it('should have correct h2 text content', () => {
    const h2Element = el.query(By.css('h2'))
    expect(h2Element.nativeElement.textContent).toBe('Our Location')
  });

  it('should have the correct embedded map', () => {
    const iframe = el.query(By.css('iframe'))
    expect(iframe.nativeNode.src).toBe("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11743.979157381971!2d25.374830250060413!3d42.61906650953431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40a85581c598de43%3A0x1d21c72b69a82965!2z0KbQtdC90YLRitGAINCa0LDQt9Cw0L3Qu9GK0Lo!5e0!3m2!1sbg!2sbg!4v1689675484767!5m2!1sbg!2sbg")
  })

  it('should have 3 font awesome icons', () => {
    const icons = el.queryAll(By.css('fa-icon'))
    expect(icons.length).toBe(3)
  })

});
