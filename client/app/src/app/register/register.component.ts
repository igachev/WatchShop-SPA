import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
//@ViewChild('myForm') myForm!:NgForm;

onSubmit(myForm:NgForm) {
  console.log(myForm);
  const {email,password,repeatPassword} = myForm.value;
  console.log(email);
  
}
}
