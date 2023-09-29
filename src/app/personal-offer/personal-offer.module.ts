import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalOfferRoutingModule } from './personal-offer-routing.module';
import { PersonalOfferComponent } from './personal-offer.component';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    PersonalOfferComponent
  ],
  imports: [
    CommonModule,
    PersonalOfferRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    CardModule,
    ButtonModule
  ]
})
export class PersonalOfferModule { }
