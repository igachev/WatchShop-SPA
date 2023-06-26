import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorMessage!:string;

  constructor(private userService: UserService,
    private router: Router,
    private toastService: ToastService) {}

  login(myForm: NgForm): void {
    const {email,password} = myForm.value;
    this.userService.login({email,password}).subscribe({
      next: () => {
        
        this.router.navigate(['/home'])
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

}
