import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { BlogService } from './services/blog/blog.service';
import { CommentService } from './services/comment/comment.service';
import { LikeService } from './services/like/like.service';
import { AuthGuard } from './auth/auth.guard';
import { NotAuthGuard } from './auth/notAuth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { EditBlogComponent } from './components/edit-blog/edit-blog.component';
import { NewBlogComponent } from './components/new-blog/new-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    EditBlogComponent,
    NewBlogComponent,
    ViewBlogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CKEditorModule
  ],
  providers: [
    AuthService, 
    BlogService, 
    CommentService, 
    LikeService, 
    AuthGuard, 
    NotAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
