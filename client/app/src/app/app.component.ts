import { Component, OnInit } from '@angular/core';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  showToast = false;
  toastMessage = '';
  toastType = '';
  toastPosition = '';

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.status.subscribe((msg: string) => {
      this.toastType = localStorage.getItem('toastType') || '';
      this.toastPosition = localStorage.getItem('toastPosition') || '';
      if(msg == null) {
        this.showToast = false
      }
      else {
        this.showToast = true;
        this.toastMessage = msg;
      }
    })
  }
  

  closeToast(): void {
    this.showToast = false;
    
  }
  
}
