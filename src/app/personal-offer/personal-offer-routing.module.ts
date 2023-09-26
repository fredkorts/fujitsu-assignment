import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalOfferComponent } from './personal-offer.component';

const routes: Routes = [{ path: '', component: PersonalOfferComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalOfferRoutingModule { }
