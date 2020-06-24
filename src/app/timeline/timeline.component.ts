import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../shared/blog';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  blogs: Blog[];
  user = "";

  constructor(
    private router: Router,
    private blogService: BlogService,
    @Inject('BaseURL')public BaseURL) { }

  ngOnInit(): void {
    
    if ( localStorage.getItem('token') && localStorage.getItem('user')) {
      //this.global.me = JSON.parse(localStorage.getItem('user'));
      console.log("im in if cond on timeline.comp.ts")
      this.user = localStorage.getItem('user');
      this.blogService.mysubject.subscribe(
        () => {
          this.getBlogs();
        }
      );
      
      this.getBlogs();
    } else {
      console.log("im in else cond on timeline.comp.ts")

      this.router.navigate(['/user']);
    }
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe(
      response => {
        console.log("Blogs: ", response);
        this.blogs = response;
      }
    );

  };

  deleteBlog(id) {
    console.log(id);
    this.blogService.deleteBlog(id).subscribe(
      response => {
        console.log(response);
        this.blogService.mysubject.next('Data changed');
      }
    );
    
  }

  logoutClicked() {
    // this.global.me = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartid');
    this.router.navigate(['/user']);
  }
}
