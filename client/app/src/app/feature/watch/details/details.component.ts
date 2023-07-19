import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWatch } from '../../../shared/interfaces/IWatch';
import { WatchService } from '../../../core/services/watch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/user.service';
import { ToastService } from '../../../core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {
watch!: IWatch;
subscription!: Subscription;
deleteSubscription!: Subscription;
cartSubscription!: Subscription;
message!: string;

constructor(
  private watchService: WatchService,
  private activatedRoute: ActivatedRoute,
  private userService: UserService,
  private router: Router,
  private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getOne();
  }

getOne(): void {
  const watchId = this.activatedRoute.snapshot.params['watchId'];
 this.subscription = this.watchService.getOne(watchId).subscribe((watch) => {
    this.watch = watch
  })
}

addToCart(): void {
  const watchId = this.activatedRoute.snapshot.params['watchId'];
  const userId = localStorage?.getItem('_id') || ''
 this.cartSubscription = this.watchService.addToCart(userId,watchId).subscribe({
    next: () => {
      this.message = 'Added To Cart'
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
  }
  )
}

deleteOne(): void {
  const watchId = this.activatedRoute.snapshot.params['watchId'];
  let confirmDelete = confirm('Are you sure you want to delete this item?')
  if(confirmDelete) {
   this.deleteSubscription = this.watchService.deleteOne(watchId).subscribe(() => {
      this.toastService.showToast('success','Successfully Deleted An Item',true)
      this.router.navigate(['/watches'])
    })
  }
}

get isLogged(): boolean {
  return this.userService.isLogged();
}

get isAdmin(): boolean {
  return this.userService.isAdmin()
}

ngOnDestroy(): void {
  if(this.subscription) {
    this.subscription.unsubscribe();
  }
  if(this.deleteSubscription) {
    this.deleteSubscription.unsubscribe();
  }
  if(this.cartSubscription) {
    this.cartSubscription.unsubscribe();
  }
}

}
