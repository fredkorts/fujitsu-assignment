import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'personal-offer', loadChildren: () => import('./personal-offer/personal-offer.module').then(m => m.PersonalOfferModule) }, { path: 'personal-form', loadChildren: () => import('./personal-form/personal-form.module').then(m => m.PersonalFormModule) }, { path: 'summary', loadChildren: () => import('./summary/summary.module').then(m => m.SummaryModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
