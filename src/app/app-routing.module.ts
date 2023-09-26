import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalOfferComponent } from './personal-offer/personal-offer.component';
import { PersonalFormComponent } from './personal-form/personal-form.component'; 
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/personal-offer', pathMatch: 'full' },  // default route
  { path: 'personal-offer/:jobOfferSecretAccessToken', component: PersonalOfferComponent },
  { path: 'personal-form/:jobOfferSecretAccessToken', component: PersonalFormComponent },
  { path: 'summary', component: SummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
