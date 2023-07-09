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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './cart/cart.component';




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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
