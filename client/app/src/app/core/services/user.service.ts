import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import {environment} from '../../../environments/environment.development'
import { environment } from 'src/environments/environment';
import { IUser } from '../../shared/interfaces/IUser';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IRegister } from '../../shared/interfaces/IRegister';
import { ILogin } from '../../shared/interfaces/ILogin';
import { IWatch } from '../../shared/interfaces/IWatch';
import { IPurchaseHistory } from '../../shared/interfaces/IPurchaseHistory';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  register(data: IRegister): Observable<IRegister> {
    return this.http.post<IRegister>(`${this.url}/users/register`, data);
  }

  login(data: ILogin): Observable<ILogin> {
    return this.http.post<ILogin>(`${this.url}/users/login`, data).pipe(
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

  getCart(): Observable<IWatch[]> {
    let userId = localStorage?.getItem('_id') || '';
    return this.http.get<IWatch[]>(`${this.url}/users/${userId}/cart`)
  }

  deleteCartItem(userId:string, watchId:string): Observable<string> {
    return this.http.delete<string>(`${this.url}/users/${userId}/cart/${watchId}`)
  }

  addToUserPurchaseHistory(userId:string,watchId:string,
    quantity:string,price:number,name:string,
    phone:string,address:string): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/users/${userId}/cart/${watchId}`, {userId,watchId,
      quantity,price,name,phone,address});
  }

  getPurchaseHistory(): Observable<IPurchaseHistory[]> {
    let userId = localStorage?.getItem('_id') || '';
    return this.http.get<IPurchaseHistory[]>(`${this.url}/users/${userId}/purchaseHistory`)
  }

  getAllPurchaseHistory(): Observable<IPurchaseHistory[]> {
    return this.http.get<IPurchaseHistory[]>(`${this.url}/users/purchaseHistory`)
  }

}
