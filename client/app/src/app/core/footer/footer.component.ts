import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SubscribeService } from '../services/subscribe.service';
import { ToastService } from '../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnDestroy {
message!: string;
emailSubscription!: Subscription;

constructor(private subscribeService: SubscribeService,
  private toastService: ToastService) { }

sendEmail(myForm: NgForm): void {
const {subscriptionEmail} = myForm.value;


 this.emailSubscription = this.subscribeService.sendEmail(subscriptionEmail).subscribe({
    next: () => {
      myForm.reset();
      this.message = 'Email sent';
      this.toastService.showToast('info',this.message,true);
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

ngOnDestroy(): void {
  if(this.emailSubscription) {
    this.emailSubscription.unsubscribe()
  }
}

}
