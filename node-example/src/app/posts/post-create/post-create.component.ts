import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(private postService:PostService){

  }
  addPost(form:NgForm){
    if(form.invalid){
      return
    }
    let post= {id:'asd121',title:form.value.title,content:form.value.content}
    console.log(post)
    this.postService.createPost(post)
    form.resetForm();
  }
}
