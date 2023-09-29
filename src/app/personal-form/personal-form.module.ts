import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalFormRoutingModule } from './personal-form-routing.module';
import { PersonalFormComponent } from './personal-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    PersonalFormComponent,
  ],
  imports: [
    CommonModule,
    PersonalFormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    InputMaskModule,
    DropdownModule,
    ButtonModule,
  ]
})
export class PersonalFormModule { }
