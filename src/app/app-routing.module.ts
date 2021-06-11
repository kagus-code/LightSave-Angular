import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component'
import {CustomAppComponent} from './custom-app/custom-app.component'
const routes: Routes = [
  { path:'',component: LandingComponent},
  { path:'login',component: LoginComponent},
  { path:'register',component: RegisterComponent},
  { path:'custom-app',component: CustomAppComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
