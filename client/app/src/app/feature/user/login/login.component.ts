import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../core/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  errorMessage!:string;
  subscription!: Subscription;

  constructor(private userService: UserService,
    private router: Router,
    private toastService: ToastService) {}

  login(myForm: NgForm): void {
    const {email,password} = myForm.value;
   this.subscription = this.userService.login({email,password}).subscribe({
      next: () => {
        
        this.router.navigate(['/watches'])
      },
      error: (err:HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          // Client-side error occurred
          this.errorMessage = 'An error occurred. Please try again later.';
          this.toastService.showToast('error',this.errorMessage,true)
        } else {
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
