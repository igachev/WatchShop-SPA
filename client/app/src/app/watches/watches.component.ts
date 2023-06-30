import { Component, OnInit } from '@angular/core';
import { WatchService } from '../services/watch.service';
import { Observable } from 'rxjs';
import { IWatch } from '../interfaces/IWatch';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.scss']
})
export class WatchesComponent implements OnInit {
  watches: IWatch[] = [];
  errorMessage:string = '';
  constructor(private watchService: WatchService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
   this.watchService.getAll().subscribe((data: IWatch[]) => {
    this.watches = data
   },
   (err: HttpErrorResponse) => {
    if (err.error instanceof ErrorEvent) {
      // Client-side error occurred
      this.errorMessage = 'An error occurred. Please try again later.';
      this.toastService.showToast('error', this.errorMessage, true);
    } else {
      // Server-side error occurred
      this.errorMessage = err.error.message || 'An unknown error occurred.';
      this.toastService.showToast('error', this.errorMessage, true);
    }
  })
  }

}
