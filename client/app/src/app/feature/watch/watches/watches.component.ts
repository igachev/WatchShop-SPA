import { Component, OnDestroy, OnInit } from '@angular/core';
import { WatchService } from '../../../core/services/watch.service';
import { IWatch } from '../../../shared/interfaces/IWatch';
import { Subscription } from 'rxjs';
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.scss']
})
export class WatchesComponent implements OnInit,OnDestroy {
  watches: IWatch[] = [];
  p: number = 1;
  subscription!: Subscription;
  
 
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
   }

}
