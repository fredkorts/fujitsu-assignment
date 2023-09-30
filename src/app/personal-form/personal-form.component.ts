import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobOfferService } from '../job-offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { nationalIdentityValidator } from '../helpers/national-identity.validator';
import { ChangeDetectorRef } from '@angular/core';

interface Dropdown {
  name: string;
  code: string;
}

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  currentStep = 1;
  events: { status: string; label: string; index: number; }[] = [];
  genders: Dropdown[] | undefined;
  relations: Dropdown[] | undefined;
  selectedGender: Dropdown | undefined;
  selectedRelation: Dropdown | undefined;

  constructor(private cdRef: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private jobOfferService: JobOfferService) { }

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('jobOfferSecretAccessToken') ?? 'default-token';

    this.genders = [
      {name: 'mees', code: 'mees'},
      {name: 'naine', code: 'naine'},
    ];

    this.relations = [
      {name: 'laps', code: 'laps'},
      {name: 'abikaasa', code: 'abikaasa'},
      {name: 'elukaaslane', code: 'elukaaslane'},
      {name: 'isa', code: 'isa'},
      {name: 'ema', code: 'ema'},
      {name: 'vanaisa', code: 'vanaisa'},
      {name: 'vanaema', code: 'vanaema'},
      {name: 'vend', code: 'vend'},
      {name: 'õde', code: 'õde'},
      {name: 'onu', code: 'onu'},
      {name: 'tädi', code: 'tädi'},
      {name: 'õe-/vennapoeg', code: 'õe-/vennapoeg'},
      {name: 'õe-/vennatütar', code: 'õe-/vennatütar'},
      {name: 'sõber', code: 'sõber'},
      {name: 'muu', code: 'muu'}
    ]

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
    this.cdRef.detectChanges();
    console.log(this.form.get('applicant')?.get('gender'));
  }

  logFormValue(): void {
    console.log(this.form.value);
  }

  getFormStatuses(): (boolean | undefined)[] {
    return [
      this.form.get('applicant')?.touched && this.form.get('applicant')?.invalid,
      this.form.get('contactDetails')?.touched && this.form.get('contactDetails')?.invalid,
      this.form.get('bankAccount')?.touched && this.form.get('bankAccount')?.invalid,
      this.form.get('emergencyContact')?.touched && this.form.get('emergencyContact')?.invalid,
    ];
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
