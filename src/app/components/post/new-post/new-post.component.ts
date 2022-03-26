import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
 
post
  constructor(private postService: PostService,private router: Router) { }
  
  ngOnInit(): void {
  }
  

  addPost(description,postimages) {
    const images : File = postimages.files;
    const text : string = description.value
    this.postService.addPost(text,images).subscribe(response=>{
        console.log(response.images)
    })
  }

}
