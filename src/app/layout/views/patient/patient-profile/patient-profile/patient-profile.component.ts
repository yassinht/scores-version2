import { PatientService } from 'src/app/demo/service/patient/patient.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { ssnLengthValidator } from 'src/app/layout/helpers/custom-validators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss'],
  providers: [MessageService],
})
export class PatientProfileComponent {
  patientForm: FormGroup;
  isFormEditable = false;
  isPasswordDialogVisible = false;
  password: string = '';
  selectedGender: any;
  genders = ['Male', 'Female'];  // Adjust gender list
  patient: any;
  id: string;
  loading: boolean = true;

  EditMode:Boolean=false
  changePasswordForm: FormGroup;
gender:any
  constructor(
    private fb: FormBuilder,
    private _PatientService: PatientService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.id = this.authService.getUserId();
  }

  ngOnInit(): void {
    this.loading = true;
    this.patient = this.authService.getUserData();

    this.initializeForm();  // Make sure this is called before loading patient data
    this.loadPatientData();
  }
  

  // Initialize the form with patient data
  initializeForm(): void {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      tel: ['', Validators.required],
      adresse: ['', Validators.required],
      weight: ['', Validators.required],
      ssn: ['', [Validators.required, ssnLengthValidator()]],
      size: ['', Validators.required],
    });
    this.patientForm.disable();

    this.changePasswordForm = this.fb.group(
      {
        password: ['', Validators.required],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  
  
  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }
  // Load patient data (e.g., from the AuthService or API)
  loadPatientData(): void {
    this.loading = true;

    this.patient = this.authService.getUserData();
    console.log(this.patient);
    this.gender=this.patient.gender
    if (this.patient) {

      this.patientForm.patchValue({
        name: this.patient.name,
        lastname: this.patient.lastname,
        birthday: this.patient.birthday,
        tel: this.patient.tel,
        adresse: this.patient.adresse,
        gender: this.patient.gender,
        ssn: this.patient.ssn,
        email: this.patient.email,
        size: this.patient.size,
        weight: this.patient.weight,
      });
      this.loading = false;

    } else {
      console.error('Patient data not available');
    }
  }
  
  


  // Toggle form between edit and view mode
  toggleEditMode(): void {
    this.EditMode= !this.EditMode

    this.isFormEditable = !this.isFormEditable;
    if (this.isFormEditable) {
      this.patientForm.enable();
    } else {
      this.patientForm.disable();
    }
  }

  // Open password change dialog
  openPasswordDialog(): void {
    this.isPasswordDialogVisible = true;
  }

  // Close password change dialog
  closePasswordDialog(): void {
    this.isPasswordDialogVisible = false;
    this.password = '';
  }

  updateProfile(): void {   
    if (!this.password) {
      console.error('Password is required!');
      return;
    }
  
    console.log(this.password);
    console.log(this.patientForm);
    console.log('Form Valid:', this.patientForm.valid);
  
    if (this.patientForm.invalid) {
      console.warn('Form is invalid. Here are the issues:');
      Object.keys(this.patientForm.controls).forEach(controlName => {
        const control = this.patientForm.get(controlName);
        if (control?.invalid) {
          console.warn(`${controlName} is invalid. Errors:`, control.errors);
        }
      });
      return;
    }
  
    const updatedData = { ...this.patientForm.value };
    const payload = {
      id: this.id,
      data: updatedData,
      password: this.password
    };
  
    console.log('Payload being sent:', payload);
  
    this._PatientService.updateDataOnly(payload).subscribe(
      (res) => {
        this.authService.savePatientToken(res.token);
        this.closePasswordDialog();
        this.patientForm.disable();
        console.log(res);
  
        this.getSuccessMessage('Profile updated successfully.');
      },
      (error) => {
        this.getErrorMessage('Failed to update profile, verify your password!');
      }
    );
  }
  
  // Update the patient's password
  updatePassword(): void {
    if (this.changePasswordForm.valid) {
      const { password, newPassword } = this.changePasswordForm.value;
      const body = { oldPassword: password, newPassword };  // Match field names with backend
  
      this._PatientService.updatePasswordOnly(this.id, body).subscribe(
        (res) => {
          this.authService.saveDoctorToken(res.token)

          this.getSuccessMessage('Password updated successfully!');
        
          this.changePasswordForm.reset();
        },
        (error) => {
        
          this.getErrorMessage('Verify your current password!');
         
        }
      );
    }
  }
  // Success message
  getSuccessMessage(message: string): void {
    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: message });
  }

  // Error message
  getErrorMessage(message: string): void {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: message });
  }
}
