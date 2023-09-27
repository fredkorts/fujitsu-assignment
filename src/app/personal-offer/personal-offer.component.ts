// some.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobOfferService } from '../job-offer.service';

@Component({
  selector: 'app-personal-offer',
  templateUrl: './personal-offer.component.html',
  styleUrls: ['./personal-offer.component.scss']
})
export class PersonalOfferComponent implements OnInit {

  data: any;
  accepted: boolean = false;

  constructor(
    private jobOfferService: JobOfferService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('jobOfferSecretAccessToken');
    if (token) {
       this.jobOfferService.getJobOffer(token).subscribe(data => {
          this.data = data;
       });
    }
    
  }

  formattedDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('et-EE', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  }
}
