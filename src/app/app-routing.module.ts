import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: '/unauthorized', pathMatch: 'full' },  // Redirect to unauthorized component if path is empty
  { path: 'unauthorized', component: UnauthorizedComponent },  // The unauthorized component route
  { path: 'personal-offer/:jobOfferSecretAccessToken', loadChildren: () => import('./personal-offer/personal-offer.module').then(m => m.PersonalOfferModule) },
  { path: 'personal-form/:jobOfferSecretAccessToken', loadChildren: () => import('./personal-form/personal-form.module').then(m => m.PersonalFormModule) },
  { path: 'summary', loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
