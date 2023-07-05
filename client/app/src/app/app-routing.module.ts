import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { WatchesComponent } from './watches/watches.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path:'',redirectTo:'/watches',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'watches',component:WatchesComponent},
  {path:'watches/create', component:CreateProductComponent},
  {path:'watches/:watchId/details',component:DetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
