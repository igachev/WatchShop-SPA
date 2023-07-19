import { Component, OnDestroy, OnInit } from '@angular/core';
import { WatchService } from '../../../core/services/watch.service';
import { Subscription } from 'rxjs';
import { IWatch } from '../../../shared/interfaces/IWatch';
import { UserService } from '../../../core/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit,OnDestroy {
  watches: IWatch[] = [];
  p: number = 1;
  subscription!: Subscription;
  searchSubscription!: Subscription;
 
  constructor(private watchService: WatchService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getAll();
    
  }

  
  getAll(): void {
   this.subscription = this.watchService.getAll().subscribe((data: IWatch[]) => {
     this.watches = data
    })
   }

   search(myForm: NgForm): void {
    const {searchValue} = myForm.value;
    this.searchSubscription = this.watchService.search(searchValue)
    .subscribe((data: IWatch[]) => {
      this.watches = data
    })
   }

   get isLogged(): boolean {
    return this.userService.isLogged();
   }

   get isAdmin(): boolean {
    return this.userService.isAdmin()
   }

   ngOnDestroy(): void {

    if(this.subscription) {
      this.subscription.unsubscribe()
      }

    if(this.searchSubscription) {
      this.searchSubscription.unsubscribe()
      }

   }

}
