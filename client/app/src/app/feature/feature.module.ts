import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { WatchModule } from './watch/watch.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    UserModule,
    WatchModule
    
  ],
  exports: [
    
  ]
})
export class FeatureModule { }
