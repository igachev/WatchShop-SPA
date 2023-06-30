import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errorMessage:string = '';

constructor(private userService: UserService,
  private router: Router,
  private toastService: ToastService) {}

register(myForm:NgForm): void {
  
  const {email,password,repeatPassword} = myForm.value;
  this.userService.register({email,password,repeatPassword})
  .subscribe({
    next: () => {
      this.router.navigate(['/watches'])
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
}
