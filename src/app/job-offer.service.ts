// job-offer.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { jobOfferData } from './data/job-offer-data';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {

  constructor() { }

  getJobOffer(jobOfferSecretAccessToken: string): Observable<any> {
    // Here, I would normally use the `jobOfferSecretAccessToken` to make the API call
    // But for now, I will just return the mock data

    // Just for testing purposes.
    console.log(`Using token: ${jobOfferSecretAccessToken}`);

    return of(jobOfferData);
  }
}
