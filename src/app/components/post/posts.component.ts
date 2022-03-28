import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Like } from 'src/model/like';
import { Post } from 'src/model/post';
import { PostService } from '../../services/post.service';
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

userid :string
likeid :string
idpost :string

nbrlikes:number
showOldDescription:boolean = true


  constructor(private postService: PostService,
              private authService: AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(resultat=>{
      this.posts = resultat as Post[];
      this.posts['id']
      this.images=this.posts['image']
      this.comments=this.posts['comments']
      this.likes=this.posts['likes']
      this.showComments= this.posts.map(post => false)
      
    });
  }
  

  addlike(postid){
    this.authService.checkAuth()
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
    this.authService.checkAuth()
    this.showComments=this.posts.map(comment => false)      
    this.showComments[index]=true
    this.idpost=this.posts[index]._id
    console.log(this.idpost)
  }

  delete(idpost){
    this.authService.checkAuth()
    this.postService.deletePost(idpost).subscribe(result =>{
      this.posts=this.posts.filter(post =>{
        return post._id!=result._id
      })
    })
  }
  
  cancelPostChanges(newDescription,validate,cancel) {

    newDescription.style.display = "none"
    cancel.style.display = "none"
    validate.style.display = "none"
    this.showOldDescription = true
    
  }
  validatePost(pid,newDescription,validate,cancel) {
    this.authService.checkAuth()

    this.postService.updatePost(pid,newDescription.value).subscribe(resultat => {
      console.log(resultat)
      newDescription.style.display = "none"
      cancel.style.display = "none"
      validate.style.display = "none"
      this.showOldDescription = true
      // const post=this.posts.find(post =>{
      //   return pid==resultat._id
      // })
      // const index=this.posts.indexOf(post)
      // this.posts[index]=resultat
    })
    this.router.navigate([''])


  }

  editPost(idpost: string, newDescription, cancel, validate) {
    this.authService.checkAuth()
    const post = this.posts.find(post => {
      return post._id == idpost
    })
    newDescription.value = post.description
    newDescription.style.display = ""
    cancel.style.display = ""
    validate.style.display = ""
    this.showOldDescription = false

  
 
}
}