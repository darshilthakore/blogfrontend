import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TimelineComponent } from './timeline/timeline.component';


const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full'},
  { path: 'user', component: HomeComponent},
  { path: 'timeline', component: TimelineComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
