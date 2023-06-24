import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errorMessage:string = '';

constructor(private userService: UserService,
  private router: Router) {}

register(myForm:NgForm): void {
  console.log(myForm);
  const {email,password,repeatPassword} = myForm.value;
  this.userService.register({email,password,repeatPassword})
  .subscribe({
    next: () => {
      this.router.navigate(['/home'])
    },
    error: (err) => {
      this.errorMessage = err.error.message;
    }
  })
  
}
}
