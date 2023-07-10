import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IWatch } from '../interfaces/IWatch';
import { ToastService } from '../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
cartItems: IWatch[] = [];
message!: string;
getCartSubscription!: Subscription;
deleteCartItemSubscription!: Subscription;

constructor(private userService: UserService,
  private toastService: ToastService) { }

ngOnInit(): void {
  this.getCart();
}

getCart(): void {
this.getCartSubscription = this.userService.getCart().subscribe((items) => {
this.cartItems = items;
})
}

deleteCartItem(watchId:string): void {
  let userId = localStorage?.getItem('_id') || '';
  let confirmDelete = confirm('Are you sure you want to remove this item?')

  if(confirmDelete) {

   this.deleteCartItemSubscription = this.userService.deleteCartItem(userId,watchId).subscribe({
      next: () => {
        this.message = 'Item Removed'
        this.toastService.showToast('success',this.message,true)
        this.getCart();
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

ngOnDestroy(): void {
  if(this.getCartSubscription) {
    this.getCartSubscription.unsubscribe()
  }
  if(this.deleteCartItemSubscription) {
    this.deleteCartItemSubscription.unsubscribe()
  }
}

}
