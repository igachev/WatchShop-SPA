import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmail } from '../../shared/interfaces/IEmail';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  url:string = environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  sendEmail(subscriptionEmail:string): Observable<IEmail> {
    return this.http.post<IEmail>(`${this.url}/subscription`,{subscriptionEmail})
  }
  
}
