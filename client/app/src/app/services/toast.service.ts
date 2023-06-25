import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  timer:any;
  status: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  showToast(type:string,msg:string,position?:string,autoClose?:boolean): void {
    localStorage.setItem('toastType', type);
    localStorage.setItem('toastPosition',position || 'top-right');
    this.status.next(msg);

    if(this.timer) {
      clearTimeout(this.timer);
    }

    if(autoClose) {
      this.timer = window.setTimeout(() => {
        this.status.next(null);
      },3000)
    }

  }
  
}
