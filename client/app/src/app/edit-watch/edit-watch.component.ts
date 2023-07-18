import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WatchService } from '../services/watch.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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

  constructor(private watchService:WatchService,
    private activatedRoute: ActivatedRoute) { }

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

  }

ngOnDestroy(): void {
  if(this.getWatchSubscription) {
    this.getWatchSubscription.unsubscribe()
  }
}

}
