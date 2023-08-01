import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactsComponent } from './contacts/contacts.component';


const routes: Routes = [
  {path:'',redirectTo:'/watches',pathMatch:'full'},

  {path: 'users', loadChildren: () => import('./feature/user/user.module').then(m => m.UserModule) },
  {path: 'watches', loadChildren: () => import('./feature/watch/watch.module').then(m => m.WatchModule)},

  {path:'about',component:AboutUsComponent},
  {path:'contacts',component:ContactsComponent},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
