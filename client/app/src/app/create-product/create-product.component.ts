import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent {


  create(myForm:NgForm): void {
    const {brand,model,image,battery,mechanism,price,quantity} = myForm.value
    
  }
}
