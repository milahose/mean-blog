import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NotAuthGuard } from './auth/notAuth.guard';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { NewBlogComponent } from './components/new-blog/new-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { ProfileComponent } from './components/profile/profile.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'blog', component: BlogComponent, canActivate: [AuthGuard] },
  { path: 'blog/new', component: NewBlogComponent, canActivate: [AuthGuard] },
  { path: 'blog/:title', component: ViewBlogComponent, canActivate: [AuthGuard] },
  { path: 'blog/:title/edit', component: EditBlogComponent, canActivate: [AuthGuard] },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:username/likes', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/:username/comments', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
