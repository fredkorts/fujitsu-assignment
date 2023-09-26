import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalFormRoutingModule } from './personal-form-routing.module';
import { PersonalFormComponent } from './personal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonalFormComponent
  ],
  imports: [
    CommonModule,
    PersonalFormRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PersonalFormModule { }
