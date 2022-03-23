import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/model/post';

@Component({
  selector: 'app-show-all-comments',
  templateUrl: './show-all-comments.component.html',
  styleUrls: ['./show-all-comments.component.css']
})
export class ShowAllCommentsComponent implements OnInit {
posts :Post []
comments : any[]
  constructor(private postService: PostService,private router: Router,private activatedRoute: ActivatedRoute) { }
idpost:string 
text:string
  ngOnInit(): void {
    

    this.activatedRoute.params.subscribe({
      next:param=>{
        this.idpost=param['id'];
        this.showPostComments(this.idpost)
        
      }
    })

  }
  showPostComments(postid:string){
    this.postService.getAllComments(postid).subscribe(resultat=>{
      this.comments= resultat as Comment[];
      
    })
}
addComment(postid,text){
  this.postService.addComment(postid,text).subscribe(resultat=>{
    console.log(resultat)
  })

}

}
