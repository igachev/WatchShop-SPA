import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WatchService } from '../services/watch.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnDestroy {

  errorMessage:string = '';
  subscription!: Subscription;

constructor(private watchService: WatchService,
            private router: Router,
            private toastService: ToastService) {}


  create(myForm:NgForm): void {
    const {brand,model,image,battery,mechanism,price,strap,glass,waterResistance} = myForm.value
    const data = {brand,model,image,battery,mechanism,price,strap,glass,waterResistance}
    this.subscription = this.watchService.create(data).subscribe({
      next: () => {
        myForm.reset();
        this.errorMessage = 'Successfully added new product'
        this.toastService.showToast('success',this.errorMessage,true)
      },
      error: (err:HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          // Client-side error occurred
          this.errorMessage = 'An error occurred. Please try again later.';
          this.toastService.showToast('error',this.errorMessage,true)
        }
        
        else {
          // Server-side error occurred
          this.errorMessage = err.error.message || 'An unknown error occurred.';
          this.toastService.showToast('error',this.errorMessage,true)
          
        }
      }
    })
  }

  ngOnDestroy(): void {
    if(this.subscription) {
    this.subscription.unsubscribe()
    }
  }
}
