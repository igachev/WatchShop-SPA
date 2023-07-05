import { Component, OnDestroy, OnInit } from '@angular/core';
import { IWatch } from '../interfaces/IWatch';
import { WatchService } from '../services/watch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {
watch!: IWatch;
subscription!: Subscription;
deleteSubscription!: Subscription;

constructor(
  private watchService: WatchService,
  private activatedRoute: ActivatedRoute,
  private userService: UserService,
  private router: Router,
  private toastService: ToastService
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

deleteOne(): void {
  const watchId = this.activatedRoute.snapshot.params['watchId'];
  let confirmDelete = confirm('Are you sure you want to delete this item?')
  if(confirmDelete) {
   this.deleteSubscription = this.watchService.deleteOne(watchId).subscribe(() => {
      this.toastService.showToast('success','Successfully Deleted An Item',true)
      this.router.navigate(['/watches'])
    })
  }
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
  if(this.deleteSubscription) {
    this.deleteSubscription.unsubscribe();
  }
}

}
