import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { FormsService } from 'src/app/demo/service/forms/forms.service';
import { InvitaionService } from 'src/app/demo/service/invitation/invitaion.service';
import { PatientService } from 'src/app/demo/service/patient/patient.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-patients',
  templateUrl: './my-patients.component.html',
  styleUrls: ['./my-patients.component.scss'],
  providers: [MessageService],
})
export class MyPatientsComponent {
  patients: any[] = [];
  loading: boolean = true;
  selectedPatient: any;
  formsCompleted: any[] = [];
  formsInCompleted: any[] = [];
  showOverlay: boolean = false;
  searchQuery: string = '';
  filteredFormsCompleted: any[] = []; // The array for completed forms
  filteredFormsInCompleted: any[] = []; // The array for incomplete forms
  allCompletedForms: any[] = []; // Store all completed forms
  allInCompletedForms: any[] = []; // Store all incomplete forms
  doctorId:any
  isOpen: boolean[] = []; // Tracks which rows are open.
  triesDates:any
  constructor(
    private _InvitaionService: InvitaionService,
    private messageService: MessageService,
    private authService: AuthService,
    private _FormsService: FormsService,
    private translate: TranslateService,
    private router:Router

  ) {}

  ngOnInit() {
    this.doctorId = this.authService.getUserId();

    this.fetchPatients();
  }

  fetchPatients() {
    const doctorId = this.authService.getUserId();
    this.loading = true;
    this._InvitaionService.myContactsPatient(doctorId).subscribe({
      next: (data) => {
        this.patients = data.map((patient) => ({
          ...patient,
        }));
        this.loading = false;
        console.log(this.patients);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des patients :', err);
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de la récupération des patients.',
        });
        this.loading = false;
      },
    });
  }

  getSuccessMessage(): string {
    return localStorage.getItem('langauage') === 'fr'
      ? 'Invitation a été envoyée avec succès'
      : 'Invitation sent successfully';
  }

  getErrorMessage(): string {
    return localStorage.getItem('langauage') === 'fr'
      ? 'Invitation non envoyée'
      : 'Invitation not sent';
  }

  clear(dt: any) {
    dt.clear();
    this.searchQuery = ''; // Clear the search query
  }

  onGlobalFilter(dt: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    dt.filterGlobal(value, 'contains');
  }

  getpatientForm(patient: any) {
    this.selectedPatient = patient; // Save the selected patient
    const doctorId = this.authService.getUserId();

    this._FormsService.getForms(patient._id, doctorId).subscribe({
      next: (response) => {
        this.allCompletedForms = response.completed || [];
        this.filteredFormsCompleted = [...this.allCompletedForms];

        this.allInCompletedForms = response.incompleted || [];
        this.filteredFormsInCompleted = [...this.allInCompletedForms];

        this.showOverlay = true; // Show the dialog
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des formulaires :', err);
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Erreur',
          detail: 'Échec de la récupération des formulaires.',
        });
      },
    });
  }

  toggleAccordion(index: number): void {
    this.isOpen[index] = !this.isOpen[index];
  }

  getAllVersions(idForm: any) {
    this._FormsService.getAllVersions(this.selectedPatient._id, this.doctorId, idForm).subscribe((res) => {
        this.triesDates = res.triesDates;
        console.log(this.triesDates);
    });
  }

  getVersion(idForm: any,tryNumber:any){

   
         this.router.navigate([
          'doctor/response-preview',
          this.selectedPatient._id,
          this.doctorId,
          idForm,  
          tryNumber
        ]);


  
  } 



  openPatientDialog(patientId: any): void {
    // Navigate to the FichPatientComponent and pass the patient ID as a route parameter
    this.router.navigate(['/doctor/fich-patient/', patientId]);
  }
  
}
