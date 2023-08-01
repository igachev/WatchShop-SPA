import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WatchesComponent } from "./watches/watches.component";
import { CreateProductComponent } from "./create-product/create-product.component";
import { EditWatchComponent } from "./edit-watch/edit-watch.component";
import { SearchProductComponent } from "./search-product/search-product.component";
import { DetailsComponent } from "./details/details.component";
import { adminAuthGuard } from "src/app/core/guards/admin-auth.guard";

const routes: Routes = [
  {path:'',component:WatchesComponent},
  {path:'create', component:CreateProductComponent,canActivate:[adminAuthGuard]},
  {path:':watchId/edit',component:EditWatchComponent,canActivate:[adminAuthGuard]},
  {path:'search', component:SearchProductComponent},
  {path:':watchId/details',component:DetailsComponent},
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class WatchRoutingModule { }