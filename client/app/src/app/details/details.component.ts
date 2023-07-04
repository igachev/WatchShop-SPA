import { Component, OnInit } from '@angular/core';
import { IWatch } from '../interfaces/IWatch';
import { WatchService } from '../services/watch.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
watch!: IWatch;

constructor(
  private watchService: WatchService,
  private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getOne();
    
  }

getOne(): void {
  const watchId = this.activatedRoute.snapshot.params['watchId'];
  this.watchService.getOne(watchId).subscribe((watch) => {
    this.watch = watch
  })
}

}
