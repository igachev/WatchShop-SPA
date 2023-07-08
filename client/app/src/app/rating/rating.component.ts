import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WatchService } from '../services/watch.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
ratingControl = new FormControl(0)
message!: string

constructor(private watchService: WatchService,
  private activatedRoute: ActivatedRoute,
  private toastService: ToastService) {}

addRating() {
  const userId = localStorage?.getItem('_id') || '';
  const watchId = this.activatedRoute.snapshot.params['watchId'];
  const userRating = Number(this.ratingControl.value)
  this.watchService.rate(userId,watchId,userRating).subscribe({
    next: () => {
      this.message = 'Thanks For Voting!'
      this.toastService.showToast('info',this.message,true)
    },
    error: (err:HttpErrorResponse) => {
      if (err.error instanceof ErrorEvent) {
        // Client-side error occurred
        this.message = 'An error occurred. Please try again later.';
        this.toastService.showToast('error',this.message,true)
      }
      
      else {
        // Server-side error occurred
        this.message = err.error.message || 'An unknown error occurred.';
        this.toastService.showToast('error',this.message,true)
        
      }
    }
  })
  
}
}
