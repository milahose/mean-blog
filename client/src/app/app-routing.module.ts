import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NotAuthGuard } from './auth/notAuth.guard';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { ProfileComponent } from './components/profile/profile.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
