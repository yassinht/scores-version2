import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { FormsService } from 'src/app/demo/service/forms/forms.service';
import { Router } from '@angular/router';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DoctorsService } from 'src/app/demo/service/my-doctors/doctors.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class DoctorsListComponent implements OnInit {
  doctors: any[] = [];
  loading: boolean = true;
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
  @ViewChild('op1') op1: OverlayPanel;

  constructor(
    private doctorsService: DoctorsService,
    private authService: AuthService,
    private formsService: FormsService,
    private router: Router,
    private translate: TranslateService,
    private _FormsService: FormsService,

  ) {}

  ngOnInit() {
    this.loading = true;

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
    this.loading = true;
    // Make your data fetching call
    this.doctorsService.myContactsDoctor(this.patietnId).subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false; // Set to false once data is fetched
      },
      error: (err) => {
        console.error(this.translate.instant('ERRORS.FETCH_DOCTORS'), err);
        this.loading = false;
      }
    });
    
  }

  openFormsOverlay(event: any, docId: string, isCompleted: boolean) {
    this.selectedDoctorId = docId;
    this.overlayTitle = isCompleted
      ? this.translate.instant('OVERLAY.COMPLETED_FORMS')
      : this.translate.instant('OVERLAY.UNCOMPLETED_FORMS');
    this.isCompletedForms = isCompleted;

    console.log(this.translate.instant('LOG.IS_COMPLETED'), this.isCompletedForms);

    this.op1.show(event);
    this.fetchForms(isCompleted);
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
