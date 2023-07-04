import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWatch } from '../interfaces/IWatch';
import { WatchService } from '../services/watch.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {
watch!: IWatch;
subscription!: Subscription;

constructor(
  private watchService: WatchService,
  private activatedRoute: ActivatedRoute,
  private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getOne();
  }

getOne(): void {
  const watchId = this.activatedRoute.snapshot.params['watchId'];
 this.subscription = this.watchService.getOne(watchId).subscribe((watch) => {
    this.watch = watch
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
    this.subscription.unsubscribe();
  }
}

}
