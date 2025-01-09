import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { PatientService } from 'src/app/demo/service/patient/patient.service';

@Component({
  selector: 'app-complit-profile',
  templateUrl: './complit-profile.component.html',
  styleUrls: ['./complit-profile.component.scss']
})
export class ComplitProfileComponent {
  patientForm: FormGroup;
  email: any;
  mailConfirmation: any;
  @Output() profileCompleted = new EventEmitter<void>();
  myDate = new Date();

  constructor(       
    private authService: AuthService,
    private fb: FormBuilder, private _PatientService: PatientService, private _AuthService: AuthService) { }

  ngOnInit(): void {
    this.email = this._AuthService.getUserEmail();
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: [{ value: this.email, disabled: true }, [Validators.required, Validators.email]], // Disabled field
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      tel: ['', Validators.required],
      adresse: ['', Validators.required],
      weight: ['', Validators.required],
      archived: false,
      account_state: true,
      photo:'',
      added_date: '',
      ssn: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9), Validators.pattern(/^\d+$/)]], // Fixed validator
      mailConfirmation: [true],
      consentement: [true], // Default is true
      size: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.patientForm.valid) {
      // Temporarily enable the email field
      this.patientForm.get('email')?.enable();
  
      this._PatientService.completeProfile(this.patientForm.value).subscribe(
        (res) => {
          console.log(res);
          // Access the token using `any`
          const token = (res as any).token;
          if (token) {
            this.authService.savePatientToken(token);
          }
          const response = res as any;
          this.mailConfirmation = response.patient.mailConfirmation;
          localStorage.setItem('mailConfirmation', this.mailConfirmation);
  
          // window.location.reload();
          this.profileCompleted.emit();
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  
      // Re-disable the email field after submission
      this.patientForm.get('email')?.disable();
    } else {
      console.log('Form is not valid');
      this.logInvalidFields();
    }
  }
  
  
  private logInvalidFields(): void {
    const invalidFields = [];
    Object.keys(this.patientForm.controls).forEach(field => {
      const control = this.patientForm.get(field);
      
      if (control) {
        if (control.disabled) {
          control.enable({ emitEvent: false }); // Temporarily enable disabled fields for validation
        }

        if (control.invalid) {
          invalidFields.push(field);
          console.error(`Field "${field}" is invalid.`, control.errors);
        }

        if (control.disabled) {
          control.disable({ emitEvent: false }); // Disable the field again after validation
        }
      } else {
        console.warn(`Field "${field}" is missing in the FormGroup.`);
      }
    });

    console.log('Invalid fields:', invalidFields.length > 0 ? invalidFields.join(', ') : 'None');
  }
}
