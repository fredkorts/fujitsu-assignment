import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalOfferRoutingModule } from './personal-offer-routing.module';
import { PersonalOfferComponent } from './personal-offer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PersonalOfferComponent
  ],
  imports: [
    CommonModule,
    PersonalOfferRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PersonalOfferModule { }
