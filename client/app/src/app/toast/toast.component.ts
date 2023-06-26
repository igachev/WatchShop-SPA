import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  showToast = false;
  toastMessage = '';
  toastType = '';

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.status.subscribe((msg: string) => {
      this.toastType = localStorage.getItem('toastType') || '';
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
