import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { FormsService } from 'src/app/demo/service/forms/forms.service';
import { DoctorsService } from 'src/app/demo/service/my-doctors/doctors.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss'],
})
export class FormListComponent implements OnInit {
  unfilledForms: { doctor: any; forms: any[] }[] = []; // Array to group doctors and their forms
  loading: boolean = true;
  patientId!: string;
  idForm: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formsService: FormsService,
    private doctorsService: DoctorsService,
    private cdr: ChangeDetectorRef // Add ChangeDetectorRef

  ) {}

  ngOnInit(): void {
    this.patientId = this.authService.getUserId();
    if (this.patientId) {
      this.fetchDoctorsList();
    } else {
      this.loading = false;
      console.error('Patient is not logged in');
    }
  }

  fetchDoctorsList(): void {
    this.doctorsService.myContactsDoctor(this.patientId).subscribe({
      next: (doctors) => {
        if (doctors && doctors.length > 0) {
          this.loadUnfilledForms(doctors);
        } else {
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching doctors:', err);
        this.loading = false;
      },
    });
  }

  loadUnfilledForms(doctors: any[]): void {
    const tempData: { doctor: any; forms: any[] }[] = [];
    let completedRequests = 0;
  
    doctors.forEach((doctor) => {
      this.formsService.getForms(this.patientId, doctor.doctors._id).subscribe({
        next: (response) => {
          const unfilledForms = response.incompleted || [];
          if (unfilledForms.length > 0) {
            // Ensure that affectedOn is a Date object
            unfilledForms.forEach((form: any) => {
              form.affectedOn = new Date(form.affectedOn); // Convert to Date if it's not already
            });
            tempData.push({ doctor: doctor.doctors, forms: unfilledForms });
          }
        },
        error: (err) => {
          console.error(`Error fetching forms for doctor ${doctor.doctors.name}:`, err);
        },
        complete: () => {
          completedRequests++;
          if (completedRequests === doctors.length) {
            this.unfilledForms = tempData;
            console.log('Final Unfilled Forms:', this.unfilledForms); // Debugging
            this.loading = false;
            this.cdr.detectChanges(); // Trigger change detection
          }
        },
      });
    });
  }
  

  
  

  onGlobalFilter(table: Table, event: any) {
    const filterValue = event.target.value;
  
    // If it's a date, ensure that the value is correctly parsed
    if (isNaN(Date.parse(filterValue))) {
      table.filterGlobal(filterValue, 'contains'); // Adjust the filter type as needed
    } else {
      table.filterGlobal(new Date(filterValue), 'equals'); // Ensure correct date comparison
    }
  }
  
  async openFormDetails(idF: any,idDocter:any) {
    this.idForm = idF;
    await this.router.navigate([
      'patient/form-preview',
      idF,
      idDocter,
      this.patientId,
    ]);

  }


}
