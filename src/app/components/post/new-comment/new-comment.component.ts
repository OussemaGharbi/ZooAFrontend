import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  constructor(private postService: PostService,private router: Router) { }

  ngOnInit(): void {

  }
  addComment(postid,text){
    this.postService.addComment(postid,text).subscribe(resultat=>{
      console.log(resultat)
    })
  
  }
  

}
