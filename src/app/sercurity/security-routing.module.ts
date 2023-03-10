import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {VerifyPasswordComponent} from "./verify-password/verify-password.component";



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'verify-reset-password',component: VerifyPasswordComponent},
  // {path:'verify-reset-password',component: VerifyPasswordComponent, canActivate: [AuthGuard], data:{expectedRole: ['ROLE_ADMIN']}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
