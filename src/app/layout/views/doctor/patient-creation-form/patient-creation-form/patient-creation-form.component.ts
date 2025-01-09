import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-creation-form',
  templateUrl: './patient-creation-form.component.html',
  styleUrls: ['./patient-creation-form.component.scss']
})
export class PatientCreationFormComponent {
  patientForm: FormGroup;
  email: string;

  constructor(private fb: FormBuilder,private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
    });
  
   }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [ this.email, [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      tel: ['', Validators.required],
      adresse: ['', Validators.required],
      weight: ['', Validators.required],
      size: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.patientForm.get('email')?.disable();

  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      console.log(this.patientForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}