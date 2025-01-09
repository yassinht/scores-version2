import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { InvitaionService } from 'src/app/demo/service/invitation/invitaion.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-invt-list',
  templateUrl: './invt-list.component.html',
  styleUrls: ['./invt-list.component.scss']
})
export class InvtListComponent implements OnInit {
  invitations: any[] = [];
  loading: boolean = true;

  constructor(
    private invitationService: InvitaionService,
    private authService: AuthService, // Inject AuthService
    private translate: TranslateService

  ) {}

  ngOnInit(): void {
    const patientId = this.authService.getUserId(); // Fetch patient ID dynamically
    if (patientId) {
      this.fetchInvitations(patientId); // Pass patientId to fetch invitations
    } else {
      console.error('Patient ID not found');
    }
  }

  fetchInvitations(patientId: string): void {
    this.loading = true;
    this.invitationService.getInvts(patientId).subscribe(
      (data) => {
        this.invitations = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching invitations:', error);
        this.loading = false;
      }
    );
  }

  acceptInvitation(invitationId: string): void {
    const body = { status: true }; // Example payload
    this.invitationService.acceptInvts(invitationId, body).subscribe(
      (response) => {
        const patientId = this.authService.getUserId(); // Fetch patient ID again if needed
        if (patientId) {
          this.fetchInvitations(patientId); // Refresh data after accepting invitation
        }
      },
      (error) => console.error('Error accepting invitation:', error)
    );
  }
}
