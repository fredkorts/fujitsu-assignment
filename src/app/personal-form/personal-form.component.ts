import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements OnInit {

  form!: FormGroup;
  currentStep = 1;
  genders: SelectItem[] = [];
  events: string[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.events = [
      "Isiku Andmed", "Kontakt", "Pank", "Hädaabi kontakt"
    ];
    this.genders = [
      {label: 'Mees', value: 'mees'},
      {label: 'Naine', value: 'naine'},
      {label: 'Muu', value: 'muu'},
    ];
    this.form = this.fb.group({
      applicant: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        nationalIdentityNumber: [null],
        dateOfBirth: [''],
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
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        relationshipType: [null, Validators.required],
        phoneNumber: [null, Validators.required],
        emailAddress: [null, [Validators.required, Validators.email]]
      })
    });
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

  onSubmit(): void {
    console.log(this.form.value);
  }
}
