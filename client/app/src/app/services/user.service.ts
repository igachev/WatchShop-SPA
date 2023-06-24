import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment.development'
import { IUser } from '../interfaces/IUser';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = environment.apiUrl;
  accessToken!:string
  constructor(private http: HttpClient) { }

  register(data: {email:string, password:string, repeatPassword:string}) {
    return this.http.post(`${this.url}/users/register`,data)
  }

  login(data: {email:string, password:string}) {
    return this.http.post<IUser>(`${this.url}/users/login`,data)
    .pipe(
      tap((res) => this.setLocalStorage(res))
    )
  }

  setLocalStorage(authResult:any):void {
    localStorage.setItem('accessToken',authResult.accessToken)
    localStorage.setItem('_id',authResult._id)
    localStorage.setItem('email',authResult.email)
  }

  isLogged(): boolean {
    return !!localStorage?.getItem('accessToken')
  }

  logout(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('_id')
    localStorage.removeItem('email')
  }

}
