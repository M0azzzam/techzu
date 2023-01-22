import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from "./component/user-container/user.component";

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: ':type',
    pathMatch: 'full',
    loadChildren: () => import('../user-detail/user-detail.module').then(m => m.UserDetailModule)
  },
  {
    path: ':type/:id',
    pathMatch: 'full',
    loadChildren: () => import('../user-detail/user-detail.module').then(m => m.UserDetailModule)
  },
  // {
  //   path: 'view',
  //   pathMatch: 'full',
  //   loadChildren: () => import('../user-detail/user-detail.module').then(m => m.UserDetailModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
