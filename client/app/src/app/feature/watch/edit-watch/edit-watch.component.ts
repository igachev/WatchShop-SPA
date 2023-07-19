import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WatchService } from '../../../core/services/watch.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-watch',
  templateUrl: './edit-watch.component.html',
  styleUrls: ['./edit-watch.component.scss']
})
export class EditWatchComponent implements OnInit,OnDestroy {

  brandValue!: string;
  modelValue!: string;
  imageValue!: string;
  batteryValue!: string;
  mechanismValue!: string;
  priceValue!: number;
  strapValue!: string;
  glassValue!: string;
  waterResistanceValue!: string;
  getWatchSubscription!: Subscription;
  updateWatchSubscription!: Subscription;
  message!: string;

  constructor(private watchService:WatchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.getOne()
  }

  getOne(): void {
    const watchId = this.activatedRoute.snapshot.params['watchId'];
    this.getWatchSubscription = this.watchService.getOne(watchId)
    .subscribe((watch) => {
      this.brandValue = watch.brand;
      this.modelValue = watch.model;
      this.imageValue = watch.image;
      this.batteryValue = watch.battery;
      this.mechanismValue = watch.mechanism;
      this.priceValue = watch.price;
      this.strapValue = watch.strap;
      this.glassValue = watch.glass;
      this.waterResistanceValue = watch.waterResistance;
    })
  }

  edit(myForm:NgForm) {
    const watchId = this.activatedRoute.snapshot.params['watchId'];
    const {brand,model,image,battery,mechanism,price,strap,glass,waterResistance} = myForm.value;
    const data = {brand,model,image,battery,mechanism,price,strap,glass,waterResistance};

    this.updateWatchSubscription = this.watchService.editOne(watchId,data)
    .subscribe({
      next: () => {
        this.message = 'Edit was successful';
        this.toastService.showToast('success',this.message,true);
        this.router.navigate([`/watches/${watchId}/details`])
      },
      error: (err:HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          // Client-side error occurred
          this.message = 'An error occurred. Please try again later.';
          this.toastService.showToast('error',this.message,true)
        }
        
        else {
          // Server-side error occurred
          this.message = err.error.message || 'An unknown error occurred.';
          this.toastService.showToast('error',this.message,true)
        }
      }
    })
  }

ngOnDestroy(): void {

  if(this.getWatchSubscription) {
    this.getWatchSubscription.unsubscribe()
  }

  if(this.updateWatchSubscription) {
    this.updateWatchSubscription.unsubscribe()
  }
  
}

}
