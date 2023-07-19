import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './feature/user/login/login.component';
import { RegisterComponent } from './feature/user/register/register.component';
import { CreateProductComponent } from './feature/watch/create-product/create-product.component';
import { WatchesComponent } from './feature/watch/watches/watches.component';
import { DetailsComponent } from './feature/watch/details/details.component';
import { SearchProductComponent } from './feature/watch/search-product/search-product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './feature/user/cart/cart.component';
import { PurchaseHistoryComponent } from './feature/user/purchase-history/purchase-history.component';
import { AllPurchaseHistoryComponent } from './feature/user/all-purchase-history/all-purchase-history.component';
import { adminAuthGuard } from './core/guards/admin-auth.guard';
import { userAuthGuard } from './core/guards/user-auth.guard';
import { guestAuthGuard } from './core/guards/guest-auth.guard';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EditWatchComponent } from './feature/watch/edit-watch/edit-watch.component';


const routes: Routes = [
  {path:'',redirectTo:'/watches',pathMatch:'full'},
  {path:'login',component:LoginComponent,canActivate:[guestAuthGuard]},
  {path:'register',component:RegisterComponent,canActivate:[guestAuthGuard]},
  {path:'cart',component:CartComponent,canActivate:[userAuthGuard]},
  {path:'purchaseHistory',component:PurchaseHistoryComponent,canActivate:[userAuthGuard]},
  {path:'allPurchaseHistory',component:AllPurchaseHistoryComponent,canActivate:[adminAuthGuard]},
  {path:'watches',component:WatchesComponent},
  {path:'watches/create', component:CreateProductComponent,canActivate:[adminAuthGuard]},
  {path:'watches/:watchId/edit',component:EditWatchComponent,canActivate:[adminAuthGuard]},
  {path:'watches/search', component:SearchProductComponent},
  {path:'watches/:watchId/details',component:DetailsComponent},
  {path:'about',component:AboutUsComponent},
  {path:'contacts',component:ContactsComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
