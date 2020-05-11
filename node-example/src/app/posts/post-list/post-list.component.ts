import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Post} from '../post.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: 'post-list.component.html',
  styleUrls:['post-list.component.css']
})

export class PostListComponent implements OnInit,OnDestroy {
  posts:Post[]=[];
  private postSubs:Subscription
  constructor(public postService:PostService) {
   }
  ngOnInit() {
    this.postService.getPosts()
    this.postSubs = this.postService.getUpdatedPostListener().subscribe((posts:Post[])=>{
      this.posts = posts;
    })
  }
  deletePost(postId:string)
  {
    this.postService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postSubs.unsubscribe();
  }
}
