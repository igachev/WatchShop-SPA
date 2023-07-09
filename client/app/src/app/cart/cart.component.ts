import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IWatch } from '../interfaces/IWatch';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
cartItems: IWatch[] = [];

constructor(private userService: UserService) { }

ngOnInit(): void {
  this.getCart();
}

getCart(): void {
this.userService.getCart().subscribe((items) => {
this.cartItems = items;
})
}

}
