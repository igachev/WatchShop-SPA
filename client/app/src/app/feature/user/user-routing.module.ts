import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { CartComponent } from "./cart/cart.component";
import { PurchaseHistoryComponent } from "./purchase-history/purchase-history.component";
import { AllPurchaseHistoryComponent } from "./all-purchase-history/all-purchase-history.component";
import { NgModule } from "@angular/core";
import { guestAuthGuard } from "src/app/core/guards/guest-auth.guard";
import { userAuthGuard } from "src/app/core/guards/user-auth.guard";
import { adminAuthGuard } from "src/app/core/guards/admin-auth.guard";


const routes: Routes = [
    {path:'login',component:LoginComponent,canActivate:[guestAuthGuard]},
    {path:'register',component:RegisterComponent,canActivate:[guestAuthGuard]},
    {path:'cart',component:CartComponent,canActivate:[userAuthGuard]},
    {path:'purchaseHistory',component:PurchaseHistoryComponent,canActivate:[userAuthGuard]},
    {path:'allPurchaseHistory',component:AllPurchaseHistoryComponent,canActivate:[adminAuthGuard]},
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }