import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { VeterinaireComponent } from './components/veterinaire/veterinaire.component';
import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './services/auth.guard';
import { PostsComponent } from './components/post/posts.component';
import { TakeAppointmentComponent } from './components/take-appointment/take-appointment.component';
import { NewPostComponent } from './components/post/new-post/new-post.component';
import { ShowAllCommentsComponent } from './components/post/show-all-comments/show-all-comments.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
    {path:'veterinaire', component:VeterinaireComponent},
    {path:'login', component:AuthComponent},
    {path:'signup', component:SignupComponent},
    {path:'appointments/:id', component:AppointmentComponent},
    {path:'', component:PostsComponent},
    {path:'takeAppointment', component:TakeAppointmentComponent},
    {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]},
    {path:'profile/edit' , component:EditProfileComponent, canActivate:[AuthGuard]},
    {path:'profile/:id', component:ProfileComponent, canActivate:[AuthGuard]},
    
  {
      path: '', component: PostsComponent, children :[
      {path:'newPost' , component:NewPostComponent},
      {path: 'showAllComments/:id', component: ShowAllCommentsComponent },
      {path:'deletePosts' , component:PostsComponent},
      {path:'addLike/:id' , component:PostsComponent},
      {path:'deleteLike/:id' , component:PostsComponent},
      {path:'deleteComment/:id' , component:ShowAllCommentsComponent},]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
