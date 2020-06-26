import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Registration } from '../shared/registration';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  registrationForm: FormGroup;
  registration: Registration;
  @ViewChild('rform') registrationFormDirective;

  constructor(    
    private reg: FormBuilder,
    private registrationService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    @Inject('BaseURL') public BaseURL) {
    this.createForm();
   }

  ngOnInit(): void {
  }


  formErrors = {
    'username': '',
    'password': '',
    'email': ''
  };

  validationMessages = {
    'username': {
      'required': 'Username is required',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'password': {
      'required': 'Password is required',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
    'email': {
      'required': 'Email is required',
      'email': 'Email not in valid format'
    },
  }



  createForm(): void {
    this.registrationForm = this.reg.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      dob: ['',],
      email: ['', [Validators.required, Validators.email]],
    });
    
    this.registrationForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  
  }


  onRegister() {
    this.registration = this.registrationForm.value;
    //console.log(this.registration);
    this.registrationForm.reset({
      username: '',
      password: '',
      email: '',
      dob:'',
    });
    this.registrationFormDirective.resetForm();

    this.registrationService.registerUser(this.registration)
    .subscribe(
      registration => {
        //console.log(registration);
        this.registration = registration
      }
      
    );

  }

  onValueChanged(data?: any) {
    if (!this.registrationForm) { return; }
    const form = this.registrationForm;
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
