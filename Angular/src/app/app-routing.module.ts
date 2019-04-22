import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RxjsHttpComponent } from './rxjs-http/rxjs-http.component';
import { RxjsFormComponent } from './rxjs-form/rxjs-form.component';

const routes: Routes = [
  {
    path: 'http', component: RxjsHttpComponent
  },
  {
    path: 'form', component: RxjsFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
