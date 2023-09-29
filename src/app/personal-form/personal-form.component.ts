import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { JobOfferService } from '../job-offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { nationalIdentityValidator } from '../helpers/national-identity.validator';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  currentStep = 1;
  genders: SelectItem[] = [];
  events: { status: string; label: string; index: number; }[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private jobOfferService: JobOfferService) { }

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('jobOfferSecretAccessToken') ?? 'default-token';

    this.genders = [
      {label: 'Mees', value: 'mees'},
      {label: 'Naine', value: 'naine'},
      {label: 'Muu', value: 'muu'},
    ];

    this.form = this.fb.group({
      applicant: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        nationalIdentityNumber: [null, [Validators.required, nationalIdentityValidator()]],  // Added validator here
        dateOfBirth: [null],
        gender: [null, Validators.required]
      }),
      contactDetails: this.fb.group({
        postalAddress: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        emailAddress: [null, [Validators.required, Validators.email]]
      }),
      bankAccount: this.fb.group({
        recipientName: [null, Validators.required],
        iban: [null, Validators.required]
      }),
      emergencyContact: this.fb.group({
        ec_firstName: [null, Validators.required],
        ec_lastName: [null, Validators.required],
        ec_relationshipType: [null, Validators.required],
        ec_phoneNumber: [null, Validators.required],
        ec_emailAddress: [null, [Validators.required, Validators.email]]
      })
    });

    this.jobOfferService.getJobOffer(token).subscribe(data => {
      this.form.patchValue({
          applicant: {
              firstName: data.applicant.firstName,
              lastName: data.applicant.lastName
          },
          contactDetails: {
              phoneNumber: data.contactDetails.phoneNumber,
              emailAddress: data.contactDetails.emailAddress
          },
          bankAccount: {
            recipientName: data.applicant.firstName + ' ' +data.applicant.lastName
          }
      });
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onBlur(): void {
    this.form.get('applicant')?.get('nationalIdentityNumber')?.updateValueAndValidity();
  }

  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
