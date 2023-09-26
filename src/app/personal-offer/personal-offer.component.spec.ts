import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalOfferComponent } from './personal-offer.component';

describe('PersonalOfferComponent', () => {
  let component: PersonalOfferComponent;
  let fixture: ComponentFixture<PersonalOfferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalOfferComponent]
    });
    fixture = TestBed.createComponent(PersonalOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
