import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Blog } from '../shared/blog';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap, scan } from 'rxjs/operators';

@Component({
  selector: 'app-updateblog',
  templateUrl: './updateblog.component.html',
  styleUrls: ['./updateblog.component.scss']
})
export class UpdateblogComponent implements OnInit {

  updateblogForm: FormGroup;
  blog: Blog;
  blogcopy: Blog;
  dummynblog: Blog;
  @ViewChild('blogform') updateblogFormDirective;


  constructor(
    private updblg: FormBuilder,
    private updateblogService: BlogService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    @Inject('BaseURL') public BaseURL) {
      this.createForm();
    }

  ngOnInit(): void {

  }

  formErrors = {
    'title': '',
    'description': ''
  };

  validationMessages = {
    'title': {
      'required': 'Title is required.',
      'minlength': 'Title must be at least 2 characters long.',
      'maxlength': 'Title cannot be more than 64 characters long.'
    },
    'description': {
      'required': 'Description is required.',
      'minlength': 'Description must be at least 2 characters long.',
      'maxlength': 'Description cannot be more than 300 characters long.'
    },
  }



  createForm(): void {

    this.route.params
    .pipe(switchMap ((params: Params) => {return this.updateblogService.getBlog(params['id']); }))
    .subscribe( blog => { this.blog = blog; this.blogcopy = blog;});

    this.updateblogForm = this.updblg.group({
      title: [this.blogcopy.title, [Validators.required, Validators.minLength(2), Validators.maxLength(64)] ],
      description: [this.blogcopy.description, [Validators.required, Validators.minLength(2), Validators.maxLength(300)] ],
      image_url: [this.blogcopy.image_url,],
    });
    
    this.updateblogForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  
  }


  updateBlog() {
    this.blogcopy = this.updateblogForm.value;
    console.log(this.blogcopy);
    this.updateblogForm.reset({
      title: '',
      image_url: '',
      description: '',
    });
    this.updateblogFormDirective.resetForm();
    var owner = localStorage.getItem('user');
    this.blogcopy['owner'] = owner;
    this.updateblogService.updateBlog(this.blogcopy.id, this.blogcopy)
    .subscribe(
      response => {
        console.log(response);
        // this.registration = registration
        // this.newblogService.mysubject.next("Blog created");
              
      }
      
    );
    this.router.navigate(['/timeline']);
    // this.router.navigate(['/timeline'])

  }

  logoutClicked() {
    // this.global.me = new User();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartid');
    this.router.navigate(['/user']);
  }

  onValueChanged(data?: any) {
    if (!this.updateblogForm) { return; }
    const form = this.updateblogForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}