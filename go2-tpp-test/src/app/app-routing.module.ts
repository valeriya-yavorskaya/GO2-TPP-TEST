import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DashboardGuard } from './dashboard/dashboard.guard';

const routes: Routes = [
  { path: 'login-page', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard]},
  { path: '',   redirectTo: '/login-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
