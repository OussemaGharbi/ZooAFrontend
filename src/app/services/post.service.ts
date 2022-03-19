import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/model/Post';
import { Comment } from 'src/model/comment';
import { User } from 'src/model/user';
import { Like } from 'src/model/like';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  api:string= "http://localhost:3000/api/"
  posts: Post[] =[]
  comments: Comment[] =[]
  users: User[] =[]

  constructor(private http:HttpClient) { }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError ('Something bad happened; please try again later.');
  }
  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  getApi(){
    return this.api
  }

  
  getPosts(): Observable<any> {
    return  this.http.get(this.api + 'posts').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  getPostsById(id: string): Observable<any> {
    return  this.http.get(this.api + 'posts/'+id).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
  addPost(post: Post): Observable<any> {
    return this.http.post<{post:Post}>(this.api + 'posts', {post:post}).pipe(
      catchError(this.handleError)
    );
  }
 

  deletePost(id:string) : Observable<any>{
    return this.http.delete(this.api + 'posts/'+id ).pipe(
      catchError(this.handleError)
    )
  }
  updatePost(id :string,post:Post): Observable<any>{
    return  this.http.put<{post:Post}>(this.api +'posts/' + id, {post:post}).pipe(
      catchError(this.handleError)
    )
  }

  addComment(Post_id: string,text:string,comment:Comment): Observable<any>{
    return this.http.post<{comment:Comment}>(this.api + 'posts/'+Post_id,{comment:comment}).pipe(
      catchError(this.handleError)
    )
  }

  deleteComment(Post_id:string,Comment_id:string) : Observable<any>{
    return this.http.delete(this.api + 'posts/'+Post_id +'Comment/'+Comment_id).pipe(
      catchError(this.handleError)
    )
  }

  updateComment(Post_id :string,Comment_id:string,comment:Comment) : Observable<any>{
    return this.http.put<{comment:Comment}>(this.api + 'posts/'+Post_id+'Comment/'+Comment_id,{comment:comment}).pipe(
      catchError(this.handleError)
    )
  }

  addLike(Post_id:string,like:Like) : Observable<any>{
    return this.http.post<{like:Like}>(this.api+'posts/'+Post_id+'Like/',{like:like}).pipe(
      catchError(this.handleError)
    )
  }

  deleteLike(Post_id:string,like_id:string) : Observable<any>{
    return this.http.delete(this.api + 'posts/'+Post_id +'like/'+like_id).pipe(
      catchError(this.handleError)
    )
  }
}
