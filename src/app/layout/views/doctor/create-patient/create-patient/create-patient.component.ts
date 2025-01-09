import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PatientService } from 'src/app/demo/service/patient/patient.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss'],
  providers: [MessageService],
})
export class CreatePatientComponent {
  email: string = '';
  password: string = '';
  emailStatus: string | null = null; // Holds the status message
  isLoading: boolean = false; // Loading state indicator
  isDialogVisible: boolean = false;
  passwordVisible: boolean = false;
  showPasswordField: boolean = false;
  constructor(
    private _PatientService: PatientService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  // Verify email using API
  verifyEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      this.translate.get('patientCreation.PLEASE_ENTER_EMAIL').subscribe((translation) => {
        this.messageService.add({
          key: 'tst',
          severity: 'warn',
          summary: this.translate.instant('patientCreation.WARNING'),
          detail: translation,
        });
      });
      return;
    }

    if (!emailRegex.test(email)) {
      this.translate.get('patientCreation.INVALID_EMAIL').subscribe((translation) => {
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: this.translate.instant('patientCreation.INVALID_EMAIL'),
          detail: translation,
        });
      });
      return;
    }

    this.isLoading = true;
    this._PatientService.emailIsExist(email).subscribe(
      (response: any) => {
        console.log(response)
        if (response.success) {
          let messageKey = '';
          let summaryKey = '';
          switch (response.status) {
            case 'not_exist':
              messageKey = 'patientCreation.NON_EXISTENT_ACCOUNT';
              summaryKey = 'patientCreation.INFO';
              this.emailStatus = 'NON_EXISTENT_ACCOUNT';
              break;
            case 'blocked':
              messageKey = 'patientCreation.BLOCKED_ACCOUNT';
              summaryKey = 'patientCreation.ERROR';
              break;
            case 'active':
              messageKey = 'patientCreation.INVITATION_SENT'; // Removed extra quotation mark
              summaryKey = 'patientCreation.SUCCESS';
              break;
            case 'already_in_contact':
              messageKey = 'patientCreation.ALREADY_IN_CONTACT';
              summaryKey = 'patientCreation.INFO';
              break;
            default:
              messageKey = 'patientCreation.UNEXPECTED_RESPONSE';
              summaryKey = 'patientCreation.ERROR';
          }
          

          this.translate.get([summaryKey, messageKey]).subscribe((translations) => {
            this.messageService.add({
              key: 'tst',
              severity: 'success',
              summary: translations[summaryKey],
              detail: translations[messageKey],
            });
          });
        } else {
          this.translate.get('patientCreation.ISSUE_OCCURRED').subscribe((translation) => {
            this.messageService.add({
              key: 'tst',
              severity: 'warn',
              summary: this.translate.instant('patientCreation.WARNING'),
              detail: translation,
            });
          });
        }
        this.isLoading = false;
      },
      (error) => {
        this.translate.get('patientCreation.ERROR_OCCURED').subscribe((translation) => {
          this.messageService.add({
            key: 'tst',
            severity: 'error',
            summary: this.translate.instant('patientCreation.ERROR'),
            detail: translation,
          });
        });
        this.isLoading = false;
      }
    );
  }

  
  togglePassword(){
    this.isDialogVisible = true; // Open the dialog after sending the invitation
  }


  sendInvitation(email: string,password:any) {
    console.log(email,password)

    this._PatientService.createPatientByEmail(email,password).subscribe((res)=>{
console.log(email,password)
      this.translate.get('patientCreation.INVITATION_SENT').subscribe((translation) => {
        this.messageService.add({
          key: 'tst',
          severity: 'success',
          summary: this.translate.instant('patientCreation.SUCCESS'),
          detail: translation,
        });
      });
    })
    
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  clearForm() {
    this.email = ''; // Clear the email field
    this.emailStatus = ''; // Reset the email status
    this.isLoading = false; // Reset the loading state
  }
  
}
