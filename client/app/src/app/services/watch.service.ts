import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment.development';
import { IWatch } from '../interfaces/IWatch';
import { Observable } from 'rxjs';

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
}
