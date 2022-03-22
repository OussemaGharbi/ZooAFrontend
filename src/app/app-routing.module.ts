import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { VeterinaireComponent } from './components/veterinaire/veterinaire.component';

import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { TakeAppointmentComponent } from './components/take-appointment/take-appointment.component';
import { PostsComponent } from './components/post/posts.component';
import { NewPostComponent } from './components/post/new-post/new-post.component';
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { NewCommentComponent } from './components/post/new-comment/new-comment.component';
import { EditCommentComponent } from './components/post/edit-comment/edit-comment.component';
import { ShowAllCommentsComponent } from './components/post/show-all-comments/show-all-comments.component';


const routes: Routes = [
    {path:'veterinaire', component:VeterinaireComponent},
    {path:'login', component:AuthComponent},
    {path:'signup', component:SignupComponent},
    {path:'appointments/:id', component:AppointmentComponent},
    {path:'takeAppointment', component:TakeAppointmentComponent},
    
  {
    path: '', component: PostsComponent, children :[
      {path:'newPost' , component:NewPostComponent},
      {path:'editPost/:id' , component:EditPostComponent},
      {path: 'showAllComments/:id', component: ShowAllCommentsComponent },
      {path:'deletePosts' , component:PostsComponent},
      {path:'addLike/:id' , component:PostsComponent},
      {path:'deleteLike/:id' , component:PostsComponent},
      {path:'newComment/:id' , component:NewCommentComponent},
      {path:'editComment/:id' , component:EditCommentComponent},
      {path:'deleteComment/:id' , component:ShowAllCommentsComponent},]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
