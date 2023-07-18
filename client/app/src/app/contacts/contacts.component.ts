import { Component } from '@angular/core';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import {faBookmark} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
faPhoneAlt = faPhoneAlt;
faEnvelope = faEnvelope;
faBookmark = faBookmark;
}
