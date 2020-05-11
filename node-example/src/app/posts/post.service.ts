import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { Post } from './post.model';
import {map} from 'rxjs/operators'
@Injectable({providedIn:"root"})
export class PostService{
 /* private posts:Post[]=[
    {id:'sg123',title:'sdfgh',content:' qwfg'},
    {id:'sg124',title:'sdfgh',content:' qwfg'},
    {id:'sg125',title:'sdfgh',content:' qwfg'}
  ];
  VnjNTtfDN0fXnsxz
  */
  posts:Post[]=[];
  private updatedPost = new Subject<Post[]>();
  constructor(private http:HttpClient){}
  getPosts()
  {
    this.http.get<{messgae:string, posts:any}>("http://localhost:3000/api/posts")
    .pipe(map(data=>{
      return data.posts.map(post=>{
        return {
          title:post.title,
          content: post.content,
          id: post._id
        }
      });
    }))
    .subscribe(data=>{
      this.posts = data
      this.updatedPost.next([...this.posts]);
    })
  }
  createPost(post:Post){

    this.http.post<{message:string}>("http://localhost:3000/api/posts",post)
    .subscribe(msg=>{
      console.log(msg.message)
      this.posts.push(post);
      this.updatedPost.next([...this.posts])
    })

  }
  deletePost(postId:string){
    this.http.delete("http://localhost:3000/api/posts/"+postId)
    .subscribe(msg=>{
      console.log('deleted');
    })
  }
  getUpdatedPostListener() {
    return this.updatedPost.asObservable();
  }

}
