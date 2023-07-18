import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ToastComponent } from './toast/toast.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { WatchesComponent } from './watches/watches.component';
import { DetailsComponent } from './details/details.component';
import { SpinnerBootstrapComponent } from './spinner-bootstrap/spinner-bootstrap.component';
import { SpinnerInterceptor } from './spinner.interceptor';
import { SearchProductComponent } from './search-product/search-product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RatingComponent } from './rating/rating.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { AllPurchaseHistoryComponent } from './all-purchase-history/all-purchase-history.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditWatchComponent } from './edit-watch/edit-watch.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ToastComponent,
    CreateProductComponent,
    WatchesComponent,
    DetailsComponent,
    SpinnerBootstrapComponent,
    SearchProductComponent,
    NotFoundComponent,
    RatingComponent,
    CartComponent,
    PurchaseHistoryComponent,
    AllPurchaseHistoryComponent,
    AboutUsComponent,
    ContactsComponent,
    EditWatchComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor,multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
