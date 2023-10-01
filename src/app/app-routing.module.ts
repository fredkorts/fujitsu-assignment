import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { JobOfferSecretAccessTokenGuard } from './guards/job-offer-secret-access-token.guard';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/unauthorized', 
    pathMatch: 'full' 
  },
  { 
    path: 'unauthorized', 
    component: UnauthorizedComponent 
  },
  { 
    path: 'personal-offer/:jobOfferSecretAccessToken', 
    loadChildren: () => import('./personal-offer/personal-offer.module').then(m => m.PersonalOfferModule),
    canActivate: [JobOfferSecretAccessTokenGuard] 
  },
  { 
    path: 'personal-form/:jobOfferSecretAccessToken', 
    loadChildren: () => import('./personal-form/personal-form.module').then(m => m.PersonalFormModule),
    canActivate: [JobOfferSecretAccessTokenGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
