import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.scss']
})
export class PersonalFormComponent implements OnInit {
  personalForm!: FormGroup;
  token: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.params["jobOfferSecretAccessToken"];

    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      // ...other fields
    });
  }

  onSubmit() {
    localStorage.setItem('formData', JSON.stringify(this.personalForm.value));
  }
}
