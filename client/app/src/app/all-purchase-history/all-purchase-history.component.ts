import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IPurchaseHistory } from '../interfaces/IPurchaseHistory';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-purchase-history',
  templateUrl: './all-purchase-history.component.html',
  styleUrls: ['./all-purchase-history.component.scss']
})
export class AllPurchaseHistoryComponent implements OnInit,OnDestroy {

allPurchaseHistoryItems: IPurchaseHistory[] = [];
allPurchaseHistorySubscription!: Subscription;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.getAllPurchaseHistory()
  }

getAllPurchaseHistory(): void {
  this.allPurchaseHistorySubscription = this.userService.getAllPurchaseHistory()
  .subscribe((items) => {
    this.allPurchaseHistoryItems = items;
  })
}

  ngOnDestroy(): void {
    if(this.allPurchaseHistorySubscription) {
      this.allPurchaseHistorySubscription.unsubscribe()
    }
  }
}
