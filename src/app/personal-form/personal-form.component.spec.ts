import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PersonalFormComponent } from './personal-form.component';
import { JobOfferService } from '../job-offer.service';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { of } from 'rxjs';

// Mocking the Isikukood class
class MockIsikukood {
  constructor(private idCode: string) {}

  validate() {
    return true;
  }

  getGender() {
    return 'male';
  }

  getBirthday() {
    return '1990-06-14';
  }
}

describe('PersonalFormComponent', () => {
  let component: PersonalFormComponent;
  let fixture: ComponentFixture<PersonalFormComponent>;
  let jobOfferService: jasmine.SpyObj<JobOfferService>;
  let getJobOfferSpy: jasmine.Spy;

  beforeEach(async () => {
    const mockData = {
      applicant: {
        firstName: 'John',
        lastName: 'Doe',
        nationalIdentityNumber: '3900404296',
        dateOfBirth: '14/06/90',
        gender: 'mees'
      },
      contactDetails: {
        phoneNumber: '1234567890',
        emailAddress: 'john.doe@example.com',
        postalAddress: 'Sikupilli 10',
      },
      bankAccount: {
        recipientName: 'John Doe',
        iban: 'ASD12334054040440'
      },
      emergencyContact: {
        ec_firstName: 'Maarika',
        ec_lastName: 'Maasikas',
        ec_relationshipType: 'tädi',
        ec_phoneNumber: '556721313',
        ec_emailAddress: 'maarika.maasikas@gmail.com'
      }
    };

    (globalThis as any).Isikukood = MockIsikukood;
    const getJobOfferSpy = jasmine.createSpy('getJobOffer').and.returnValue(of(mockData));

    await TestBed.configureTestingModule({
      declarations: [PersonalFormComponent, ProgressBarComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        {
          provide: JobOfferService,
          useValue: jasmine.createSpyObj('JobOfferService', { getJobOffer: getJobOfferSpy }),
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => 'test-token' } } },
        },
      ],
    }).compileComponents();

    jobOfferService = TestBed.inject(JobOfferService as any);
    jobOfferService.getJobOffer.and.returnValue(of(mockData));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form groups', () => {
    expect(component.form.get('applicant')).toBeTruthy();
    expect(component.form.get('contactDetails')).toBeTruthy();
    expect(component.form.get('bankAccount')).toBeTruthy();
    expect(component.form.get('emergencyContact')).toBeTruthy();
  });

  it('should call nextStep method and increment current step', () => {
    component.currentStep = 1;
    component.nextStep();
    expect(component.currentStep).toBe(2);
  });
});
