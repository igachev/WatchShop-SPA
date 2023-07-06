import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { ToastComponent } from './toast/toast.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { WatchesComponent } from './watches/watches.component';
import { DetailsComponent } from './details/details.component';
import { SpinnerBootstrapComponent } from './spinner-bootstrap/spinner-bootstrap.component';
import { SpinnerInterceptor } from './spinner.interceptor';


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
    SpinnerBootstrapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
