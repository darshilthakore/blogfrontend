import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { DatePipe } from '@angular/common';
import { MatDialogModule } from "@angular/material/dialog";
import {MatNativeDateModule} from '@angular/material/core';
// import { MatMomentDateModule } from "@angular/material-moment-adapter";

import { baseURL } from './shared/baseurl';

import 'hammerjs';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';
import { from } from 'rxjs';
import { NewblogComponent } from './newblog/newblog.component';
import { UpdateblogComponent } from './updateblog/updateblog.component';


import { UserService } from './services/user.service';
import { BlogService } from './services/blog.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TimelineComponent,
    NewblogComponent,
    UpdateblogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatGridListModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  providers: [
    UserService,
    BlogService,
    DatePipe,
    {provide: 'BaseURL', useValue: baseURL},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
