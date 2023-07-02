import { Component, OnDestroy, OnInit } from '@angular/core';
import { WatchService } from '../services/watch.service';
import { IWatch } from '../interfaces/IWatch';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.scss']
})
export class WatchesComponent implements OnInit,OnDestroy {
  watches: IWatch[] = [];
  p: number = 1;
  subscription!: Subscription;
 
  constructor(private watchService: WatchService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
   this.subscription = this.watchService.getAll().subscribe((data: IWatch[]) => {
     this.watches = data
    })
   }

   ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe()
      }
   }

}
