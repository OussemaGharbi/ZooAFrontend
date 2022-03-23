import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from 'src/model/Like';
import { Post } from 'src/model/post';
import { PostService } from '../../services/post.service';
import {MatButtonModule} from '@angular/material/button'; 
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
posts :Post []
showComments: boolean []= []
like :Like[]
images :any
comments : any 
likes : any

isAuthenticated :boolean
userid :string
likeid :string
idpost :string

nbrlikes:number 

  constructor(private postService: PostService,
              private authService: AuthService,
              private matButton:MatButtonModule,
              private router:Router) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(resultat=>{
      this.posts = resultat as Post[];
      this.posts['id']
      this.images=this.posts['image']
      this.comments=this.posts['comments']
      this.likes=this.posts['likes']
      this.isAuthenticated= this.authService.isAuthenticated
      this.showComments= this.posts.map(post => false)
    });
  }
  
checkAuth(){
if (!(this.isAuthenticated))
{
  this.router.navigate(['login'])
}
}
  addlike(postid){
    this.checkAuth()
    this.postService.addLike(postid).subscribe(resultat=>{
      this.nbrlikes=resultat.likes.length
      this.posts=this.posts.map(post=>{
        if(post._id==resultat._id){
          console.log(post)
          return resultat
        }else{
          return post
        }
      })
    })
  }

  showSection(index) {
    this.checkAuth();
    this.showComments=this.posts.map(comment => false)      
    this.showComments[index]=true
  }

 
}
