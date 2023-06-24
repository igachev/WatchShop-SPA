import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment.development'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(data: {email:string, password:string, repeatPassword:string}) {
    return this.http.post(`${this.url}/users/register`,data)
  }
}
