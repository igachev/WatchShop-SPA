import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { DetailsComponent } from './details/details.component';
import { EditWatchComponent } from './edit-watch/edit-watch.component';
import { RatingComponent } from './rating/rating.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { WatchesComponent } from './watches/watches.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { WatchRoutingModule } from './watch-routing.module';



@NgModule({
  declarations: [
    CreateProductComponent,
    DetailsComponent,
    EditWatchComponent,
    RatingComponent,
    SearchProductComponent,
    WatchesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    WatchRoutingModule
  ]
})
export class WatchModule { }
