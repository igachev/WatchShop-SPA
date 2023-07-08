import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.development';
import { IWatch } from '../interfaces/IWatch';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class WatchService {
url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  create(watch:IWatch): Observable<IWatch> {
    return this.http.post<IWatch>(`${this.url}/watches/create`,watch)
  }

  getAll(): Observable<IWatch[]> {
    return this.http.get<IWatch[]>(`${this.url}/watches`)
  }

  getOne(watchId: string): Observable<IWatch> {
    return this.http.get<IWatch>(`${this.url}/watches/${watchId}`)
  }

  deleteOne(watchId: string): Observable<IWatch> {
    return this.http.delete<IWatch>(`${this.url}/watches/${watchId}`)
  }

  addToCart(userId:string,watchId:string): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/watches/${watchId}`,{userId,watchId})
  }

  search(searchValue:string): Observable<IWatch[]> {
    return this.http.post<IWatch[]>(`${this.url}/watches/search`,{searchValue})
  }

  rate(userId:string,watchId:string,userRating:number): Observable<IWatch> {
    return this.http.post<IWatch>(`${this.url}/watches/${watchId}/rating`,{userId,watchId,userRating})
  }

  getRating(watchId:string): Observable<number> {
    return this.http.get<number>(`${this.url}/watches/${watchId}/rating`)
  }
}
