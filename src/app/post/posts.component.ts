import { Component, OnInit } from '@angular/core';
import { Post } from 'src/model/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

posts :Post []=[]

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(resultat=>{
      this.posts = resultat as Post[];
      console.log(this.posts);
    });
  
  }



}
