import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';
import { UpdateblogComponent } from './updateblog/updateblog.component';


const routes: Routes = [
  { path: '', redirectTo: '/timeline', pathMatch: 'full'},
  { path: 'user', component: HomeComponent},
  { path: 'timeline', component: TimelineComponent},
  { path: 'update/:id', component: UpdateblogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
