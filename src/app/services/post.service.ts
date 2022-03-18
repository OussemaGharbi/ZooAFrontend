import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Post } from 'src/model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  api:string= "http://localhost:3000/api/"
  posts: Post[] =[]

  constructor(private http:HttpClient) { }

  getApi(){
    return this.api
  }

  getPosts() {
   return  this.http.get(this.api + 'posts/')
  }
  addPost(){}

  deletePost(id){
    return this.http.delete(this.api + 'posts/'+id )
  }
  updatePost(id){}

  addComment(id ,text){}

  deleteComment(Post_id,Comment_id){}

  updateComment(Post_id,Comment_id){}

  addLike(Post_id,Comment_id){}

  deleteLike(Post_id,Comment_id){}
}
