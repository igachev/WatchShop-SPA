import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { SpinnerBootstrapComponent } from './spinner-bootstrap/spinner-bootstrap.component';



@NgModule({
  declarations: [
    ToastComponent,
    SpinnerBootstrapComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ToastComponent,
    SpinnerBootstrapComponent
  ]
})
export class SharedModule { }
