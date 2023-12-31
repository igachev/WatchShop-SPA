import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WatchService } from '../../../core/services/watch.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit, OnDestroy {
ratingControl = new FormControl(0)
hovered:number = 0;
averageRating: number = 0;
message!: string;
addRatingSubscription!: Subscription;
getRatingSubscription!: Subscription;

constructor(private watchService: WatchService,
  private activatedRoute: ActivatedRoute,
  private toastService: ToastService,
  private userService: UserService) { }

  ngOnInit(): void {
    this.getRating()
  }

addRating() {
  const userId = localStorage?.getItem('_id') || '';
  const watchId = this.activatedRoute.snapshot.params['watchId'];
  const userRating = Number(this.ratingControl.value)

 this.addRatingSubscription = this.watchService.rate(userId,watchId,userRating).subscribe({
    next: () => {
      this.message = 'Thanks For Voting!'
      this.toastService.showToast('info',this.message,true)
      this.getRating()
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

getRating(): void {
  const watchId = this.activatedRoute.snapshot.params['watchId'];
this.getRatingSubscription = this.watchService.getRating(watchId).subscribe((averageRating) => {
  this.averageRating = averageRating
 })
}

get isLogged(): boolean {
  return this.userService.isLogged();
}

get isAdmin(): boolean {
  return this.userService.isAdmin()
}

ngOnDestroy(): void {
  if(this.addRatingSubscription) {
    this.addRatingSubscription.unsubscribe();
  }
  if(this.getRatingSubscription) {
    this.getRatingSubscription.unsubscribe();
  }
}

}
