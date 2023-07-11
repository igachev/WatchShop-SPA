import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IPurchaseHistory } from '../interfaces/IPurchaseHistory';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit {

purchaseHistoryItems: IPurchaseHistory[] = []

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getPurchaseHistory();
  }

  getPurchaseHistory(): void {
    this.userService.getPurchaseHistory().subscribe((items) => {
      console.log(items);
      this.purchaseHistoryItems = items;
    })
  }

}
