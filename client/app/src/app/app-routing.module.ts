import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { WatchesComponent } from './watches/watches.component';
import { DetailsComponent } from './details/details.component';
import { SearchProductComponent } from './search-product/search-product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartComponent } from './cart/cart.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { AllPurchaseHistoryComponent } from './all-purchase-history/all-purchase-history.component';
import { adminAuthGuard } from './guards/admin-auth.guard';


const routes: Routes = [
  {path:'',redirectTo:'/watches',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'cart',component:CartComponent},
  {path:'purchaseHistory',component:PurchaseHistoryComponent},
  {path:'allPurchaseHistory',component:AllPurchaseHistoryComponent,canActivate:[adminAuthGuard]},
  {path:'watches',component:WatchesComponent},
  {path:'watches/create', component:CreateProductComponent,canActivate:[adminAuthGuard]},
  {path:'watches/search', component:SearchProductComponent},
  {path:'watches/:watchId/details',component:DetailsComponent},
  
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
