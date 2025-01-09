import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/demo/service/patient/patient.service';
import { MessageService } from 'primeng/api';
import { InvitaionService } from 'src/app/demo/service/invitation/invitaion.service';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.scss'],
  providers: [MessageService],
})
export class ListPatientsComponent implements OnInit {
  patients: any[] = [];
  loading: boolean = true;
  selectedPatient: any;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private patientService: PatientService,
    private messageService: MessageService,
    private invitaionService: InvitaionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchPatients();
  }

  fetchPatients() {
    this.loading = true;
    this.patientService.getAllPatients().subscribe({
      next: (data) => {
        this.patients = data.map((patient) => ({
          ...patient,
          invitationState: patient.invitationState || 'not_invited',
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to fetch patients.',
        });
        this.loading = false;
      },
    });
  }
  addPatient(patientId: string, patient: any): void {
    const doctorId = this.authService.getUserId();
  
    if (!doctorId) {
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Error',
        detail: 'Unable to retrieve doctor information.',
      });
      return;
    }
    patient.invitationState = 'invitation_pending';

    // Optimistic UI update: change state to "Pending"
    const previousState = patient.invitationState;
  
    this.invitaionService.sendInvitation(doctorId, patientId).subscribe({
      next: (res) => {
        console.log(res.message === "invitation_sent"); // Debug the response
      
        if (res.message === "invitation_sent") {
          console.log("Invitation successfully sent"); // Debugging log
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Success',
            detail: this.getSuccessMessage(),
          });
        } else {
          // Handle unexpected response
          patient.invitationState = previousState;
          this.messageService.add({
            key: 'tst',
            severity: 'warn',
            summary: 'Warning',
            detail: this.getErrorMessage(),
          });
        }
      },
      
      error: (err) => {
        console.error('Error sending invitation:', err);
  
        // Revert to the previous state in case of an error
        patient.invitationState = previousState;
        this.messageService.add({
          key: 'tst',
          severity: 'error',
          summary: 'Error',
          detail: 'An error occurred while sending the invitation.',
        });
      },
      complete: () => {
        // Optional: Refresh data after a delay, but only if necessary
        setTimeout(() => {
          this.fetchPatients();
        }, 500); // Allow time for backend to update
      },
    });
  }
  
  

  getButtonLabel(invitationState: string): string {
    const language = localStorage.getItem('langauage');
    switch (invitationState) {
      case 'invitation_accepted':
        return language === 'fr' ? 'Acceptée' : 'Accepted';
      case 'invitation_pending':
        return language === 'fr' ? 'En attente' : 'Pending';
      case 'not_invited':
      default:
        return language === 'fr' ? 'Envoyer' : 'Send';
    }
  }

  getButtonClass(invitationState: string): string {
    switch (invitationState) {
      case 'invitation_accepted':
        return 'p-button-outlined p-button-success';
      case 'invitation_pending':
        return 'p-button-outlined p-button-warning';
      case 'not_invited':
      default:
        return 'p-button-outlined p-button';
    }
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
    this.filter.nativeElement.value = '';  // Clear the input field
  }

  onGlobalFilter(dt: Table, event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    dt.filterGlobal(value, 'contains');
  }
  
}
