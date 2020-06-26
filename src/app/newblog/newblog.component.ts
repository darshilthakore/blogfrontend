import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Blog } from '../shared/blog';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-newblog',
  templateUrl: './newblog.component.html',
  styleUrls: ['./newblog.component.scss']
})
export class NewblogComponent implements OnInit {

  errMess: string;
  newblogForm: FormGroup;
  newblog: Blog;
  @ViewChild('blogform') newblogFormDirective;


  constructor(
    private newblg: FormBuilder,
    private newblogService: BlogService,
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
    this.newblogForm = this.newblg.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)] ],
      description: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(300)] ],
      image_url: ['',],
    });
    
    this.newblogForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  
  }


  createBlog() {
    this.newblog = this.newblogForm.value;
    //console.log(this.newblog);
    this.newblogForm.reset({
      title: '',
      image_url: '',
      description: '',
    });
    this.newblogFormDirective.resetForm();
    var owner = localStorage.getItem('user');
    this.newblog['owner'] = owner;
    this.newblogService.createBlog(this.newblog)
    .subscribe(
      response => {
        //console.log(response);
        // this.registration = registration
        this.newblogService.mysubject.next("Blog created");
        
      },
      errmess => {
        //console.log(errmess);
        this.errMess = errmess;
      }
      
    );
    // this.router.navigate(['/timeline'])

  }

  onValueChanged(data?: any) {
    if (!this.newblogForm) { return; }
    const form = this.newblogForm;
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
