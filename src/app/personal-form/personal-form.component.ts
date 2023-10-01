import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobOfferService } from '../job-offer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { nationalIdentityValidator } from '../helpers/national-identity.validator';
import { ChangeDetectorRef } from '@angular/core';
import { genders, relations } from '../data/dropdowns';
import { Dropdown, Event } from '../data/interfaces';
import { validateIBAN } from 'ngx-iban-validator';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  currentStep = 1;
  events: Event[] = [];
  genders = genders;
  relations = relations;
  selectedGender: Dropdown | undefined;
  selectedRelation: Dropdown | undefined;
  isSubmitted = false;

  constructor(private cdRef: ChangeDetectorRef, private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private jobOfferService: JobOfferService) { }

  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('jobOfferSecretAccessToken') ?? 'default-token';

    // This code block initializes the form group with form controls and validators.
    this.form = this.fb.group({
      applicant: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        nationalIdentityNumber: [null, [Validators.required, nationalIdentityValidator()]],  // Added custom validator here
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
        iban: [null, [Validators.required, validateIBAN]]
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

  // This method is called when the user interacts with the national identity number input. 
  // It forces a re-evaluation of the field's validity and updates the UI accordingly. 
  // We do this because otherwise the changes would not be visible.
  onBlur(): void {
    this.form.get('applicant')?.get('nationalIdentityNumber')?.updateValueAndValidity();
    this.cdRef.detectChanges();
    console.log(this.form.get('applicant')?.get('gender'));
  }

  // This method returns the form data at the end when the user submits it.
  get formData() {
    return JSON.stringify(this.form.value, null, 2);
  }

  // This method returns an array of boolean values indicating the error state of each form section. It's used for updating the visual indicator on the progress bar.
  getFormStatuses(): (boolean | undefined)[] {
    return [
      this.form.get('applicant')?.touched && this.form.get('applicant')?.invalid,
      this.form.get('contactDetails')?.touched && this.form.get('contactDetails')?.invalid,
      this.form.get('bankAccount')?.touched && this.form.get('bankAccount')?.invalid,
      this.form.get('emergencyContact')?.touched && this.form.get('emergencyContact')?.invalid,
    ];
  }
  
   // This method increments the current step to navigate to the next step in the form as long as the current step is not the last one.
  nextStep(): void {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  // This method decrements the current step to navigate to the previous step in the form as long as the current step is not the first one.
  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // This method is used to navigate directly to a specific step in the form. The new step number is provided as an argument.
  goToStep(step: number): void {
    this.currentStep = step;
  }

  // This method is executed when the form is submitted. Currently, it logs the form value to the console but can be expanded to include form submission logic.
  onSubmit(): void {
    this.isSubmitted = true;  // Update this property when the form is submitted
    console.log(this.form.value);
  }

  // This function allows the user to save their submitted data as a PDF file.
  generatePDF() {
    const doc = new jsPDF();
  
    let y = 10; // Initialize y coordinate
  
    const addSectionToPDF = (sectionTitle: string, formData: any) => {
      doc.text(sectionTitle, 10, y);
      y += 10; // Increment y coordinate
  
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          const value = formData[key] ? formData[key] : 'N/A'; // Handling null or undefined values
          doc.text(`${this.capitalizeFirstLetter(key)}: ${value}`, 10, y);
          y += 10;
        }
      }
  
      y += 10; // Leave a gap before the next section
    };
  
    addSectionToPDF('Applicant Information', this.form.get('applicant')?.value);
    addSectionToPDF('Contact Details', this.form.get('contactDetails')?.value);
    addSectionToPDF('Bank Account', this.form.get('bankAccount')?.value);
    addSectionToPDF('Emergency Contact', this.form.get('emergencyContact')?.value);
  
    doc.save('form-data.pdf');
  }
  
  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
}
