import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FirstComponent} from "./first/first.component";


const routes: Routes = [
  {
    path: '',
    component: FirstComponent
  },
  {
    path: 'test-angular',
    component: FirstComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
