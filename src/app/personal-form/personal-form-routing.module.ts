import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalFormComponent } from './personal-form.component';

const routes: Routes = [{ path: '', component: PersonalFormComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalFormRoutingModule { }
