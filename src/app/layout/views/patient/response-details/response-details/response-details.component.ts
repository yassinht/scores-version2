import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { FormsService } from 'src/app/demo/service/forms/forms.service';
import { DoctorsService } from 'src/app/demo/service/my-doctors/doctors.service';

@Component({
  selector: 'app-response-details',
  templateUrl: './response-details.component.html',
  styleUrls: ['./response-details.component.scss']
})
export class ResponseDetailsComponent {

  doctors: any[] = [];
  loading = true;
  patietnId: string | null = null;
  selectedDoctorId: string | null = null;
  formsCompleted: any[] = [];
  formsIncompleted: any[] = [];
  overlayTitle = '';
  isCompletedForms = false;
  triesDates: any[] = [];
  isOpen: boolean[] = [];
  accountStatusOptions = [
    { label: this.translate.instant('ACCOUNT_STATUS.ACTIVE'), value: true },
    { label: this.translate.instant('ACCOUNT_STATUS.INACTIVE'), value: false },
  ];

  constructor(
    private doctorsService: DoctorsService,
    private authService: AuthService,
    private formsService: FormsService,
    private router: Router,
    private translate: TranslateService,
    private _FormsService: FormsService,

  ) {}

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.patietnId = this.authService.getUserId();
    if (this.patietnId) {
      this.fetchDoctorsList();
    } else {
      this.loading = false;
      console.error(this.translate.instant('ERRORS.NOT_LOGGED_IN'));
    }
  }

  fetchDoctorsList() {
    this.doctorsService.myContactsDoctor(this.patietnId).subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },
      error: (err) => {
        console.error(this.translate.instant('ERRORS.FETCH_DOCTORS'), err);
        this.loading = false;
      },
    });
  }



  fetchForms(isCompleted: boolean) {
    if (!this.patietnId || !this.selectedDoctorId) return;

    this.formsService.getForms(this.patietnId, this.selectedDoctorId).subscribe({
      next: (response) => {
        if (isCompleted) {
          this.formsCompleted = response.completed || [];
          this.formsIncompleted = [];
        } else {
          this.formsIncompleted = response.incompleted || [];
          this.formsCompleted = [];
        }
      },
      error: (err) => {
        console.error(this.translate.instant('ERRORS.FETCH_FORMS'), err);
      },
    });
  }


  async openFormDetails(formId:any) {
    
    await this.router.navigate([
      'patient/form-preview/',
      formId,
      this.selectedDoctorId,
      this.patietnId,
    ]);

  }
  // Other methods unchanged...

  
  toggleAccordion(index: number): void {
    this.isOpen[index] = !this.isOpen[index];
  }

  getAllVersions(idForm: any) {
    this._FormsService.getAllVersions(this.patietnId, this.selectedDoctorId, idForm).subscribe((res) => {
        this.triesDates = res.triesDates;
        console.log(this.triesDates);
    });
  }

  getVersion(idForm: any,tryNumber:any){

   
         this.router.navigate([
          'doctor/response-preview',
          this.patietnId,
          this.selectedDoctorId,
          idForm,  
          tryNumber
        ]);


  
  } 
}
