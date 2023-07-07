import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment.development'
import { IUser } from '../interfaces/IUser';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IRegister } from '../interfaces/IRegister';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(data: IRegister): Observable<IRegister> {
    return this.http.post<IRegister>(`${this.url}/users/register`, data);
  }

  login(data: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/users/login`, data).pipe(
      tap((res) => {
        this.setLocalStorage(res);
        this.getAdminStatus().subscribe((adminValue) => {
          
          if(Object.values(adminValue)[0] === true) {
          localStorage.setItem('owner','true')
          }

        });

      })
    );
  }

  

  setLocalStorage(authResult: any): void {
    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('_id', authResult._id);
    localStorage.setItem('email', authResult.email);
  }

  isLogged(): boolean {
    return !!localStorage?.getItem('accessToken');
  }

  isAdmin(): boolean {
    return !!localStorage?.getItem('owner');
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('_id');
    localStorage.removeItem('email');
    localStorage?.removeItem('owner')
  }

  getAdminStatus(): Observable<object> {
    return this.http.get<object>(`${this.url}/users/isAdmin`);
  }

}
