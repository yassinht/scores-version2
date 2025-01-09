import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { DoctorsService } from 'src/app/demo/service/my-doctors/doctors.service';
import { jobData } from 'src/assets/demo/data/job-data';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss'],
  providers: [MessageService],
})
export class DoctorProfileComponent {
  changePasswordForm: FormGroup;
  FormPro: FormGroup;
  isFormEditable = false;
  prof: any;
  id: string;
  jobs = jobData;
  EditMode: Boolean = false;
  selectedJob: any;
  titles = ["Dr", "Prof", "Mr", "Mrs"];
  isPasswordDialogVisible = false;
  password: string = '';

  constructor(
    private fb: FormBuilder,
    private doctorsService: DoctorsService,
    private authService: AuthService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {
    this.id = this.authService.getUserId();
    this.translate.setDefaultLang('en'); // Default language is English
  }

  ngOnInit(): void {
    this.initializeForms();
    this.loadProfessionalData();
  }

  initializeForms(): void {
    this.FormPro = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      birthday: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      fax: ['', [Validators.pattern(/^\d+$/)]],
      adresse: ['', [Validators.required, Validators.minLength(2)]],
      job: ['', Validators.required],
      rpps: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      title: ['', Validators.required],
    });

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

    // Initially disable the profile form
    this.FormPro.disable();
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  loadProfessionalData(): void {
    this.prof = this.authService.getUserData();
    this.selectedJob = this.prof.job;

    if (this.prof) {
      this.FormPro.patchValue({
        name: this.prof.name,
        lastname: this.prof.lastname,
        birthday: this.prof.birthday,
        tel: this.prof.tel,
        fax: this.prof.fax,
        adresse: this.prof.adresse,
        job: this.prof.job,
        rpps: this.prof.rpps,
        email: this.prof.email,
        title: this.prof.title,
      });
    }
  }

  toggleEditMode(): void {
    this.EditMode = !this.EditMode;
    this.isFormEditable = !this.isFormEditable;
    if (this.isFormEditable) {
      this.FormPro.enable();
      this.FormPro.controls['email'].disable();
    } else {
      this.FormPro.disable();
    }
  }

  openPasswordDialog(): void {
    this.isPasswordDialogVisible = true;
  }

  closePasswordDialog(): void {
    this.isPasswordDialogVisible = false;
    this.password = ''; // Clear the password field when dialog is closed
  }

  updateProfile(): void {
    if (!this.password) {
      console.error('Password is required!');
      return;
    }

    console.log(this.password);
    this.FormPro.value.job = this.FormPro.value.job.viewValue;

    if (this.FormPro.valid) {
      const data = { ...this.FormPro.value }; // Extract the form data
      const payload = {
        id: this.id,            // Doctor ID (ensure `this.id` is properly set in your component)
        data: data,             // Data from the form
        password: this.password // Password entered in the dialog
      };

      console.log('Payload being sent:', payload);
      this.doctorsService.updateDataOnly(payload).subscribe(
        (res) => {
          this.authService.saveDoctorToken(res.token);
          this.closePasswordDialog();
          this.FormPro.disable();

          console.log(res);
          this.getSuccessMessage(this.translate.instant('profileUpdatedSuccessfully'));
        },
        (error) => {
          this.getErrorMessage(this.translate.instant('profileUpdateFailed'));
        }
      );
    }
  }

  updatePassword(): void {
    if (this.changePasswordForm.valid) {
      const { password, newPassword } = this.changePasswordForm.value;
      const body = { oldPassword: password, newPassword };  // Match field names with backend

      this.doctorsService.updatePasswordOnly(this.id, body).subscribe(
        (res) => {
          this.authService.saveDoctorToken(res.token);
          this.getSuccessMessage(this.translate.instant('passwordUpdatedSuccessfully'));
          this.changePasswordForm.reset();
        },
        (error) => {
          this.getErrorMessage(this.translate.instant('passwordUpdateFailed'));
        }
      );
    }
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }

  getSuccessMessage(message: string): void {
    this.messageService.add({ key: 'tst', severity: 'success', summary: 'Success', detail: message });
  }

  getErrorMessage(message: string): void {
    this.messageService.add({ key: 'tst', severity: 'error', summary: 'Error', detail: message });
  }
}
