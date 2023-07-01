import { Component, OnInit } from '@angular/core';
import { WatchService } from '../services/watch.service';
import { IWatch } from '../interfaces/IWatch';


@Component({
  selector: 'app-watches',
  templateUrl: './watches.component.html',
  styleUrls: ['./watches.component.scss']
})
export class WatchesComponent implements OnInit {
  watches: IWatch[] = [];
  p: number = 1;
 
  constructor(private watchService: WatchService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.watchService.getAll().subscribe((data: IWatch[]) => {
     this.watches = data
    })
   }

}
