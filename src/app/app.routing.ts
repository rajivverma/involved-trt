import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth-gaurd.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const appRoutes: Routes = [
  {
    path: '',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'forgotPassword',
    loadChildren: 'app/forgot-password/forgot-password.module#ForgotPasswordModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'pageNotFound',
    component: PagenotfoundComponent
  },
  {
    path: '**',
    redirectTo: 'pageNotFound',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });
export class AppRoutingModule { }
