import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IPurchaseHistory } from '../interfaces/IPurchaseHistory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent implements OnInit,OnDestroy {

purchaseHistoryItems: IPurchaseHistory[] = []
purchaseHistorySubscription!: Subscription;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getPurchaseHistory();
  }

  getPurchaseHistory(): void {
   this.purchaseHistorySubscription = this.userService.getPurchaseHistory().subscribe((items) => {
      this.purchaseHistoryItems = items;
    })
  }


  ngOnDestroy(): void {
    if(this.purchaseHistorySubscription) {
      this.purchaseHistorySubscription.unsubscribe() 
    }
  }

}
