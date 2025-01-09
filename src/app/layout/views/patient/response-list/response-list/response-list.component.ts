import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { FormsService } from 'src/app/demo/service/forms/forms.service';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.scss']
})
export class ResponseListComponent {
  profName: string;
  patientName: string;
  formulaires: any[] = [];
  patientId: any;
  formId: any;
  bilan: any;
  loading: boolean = false;
  doctorId:any
  constructor(
    private router: ActivatedRoute,
    private route:Router,
    private formsService: FormsService,
    private authService: AuthService,

  ) {
    this.doctorId = this.router.snapshot.paramMap.get('doctorId');
    this.formId = this.router.snapshot.paramMap.get('formId');

    this.patientId = this.authService.getUserId();

  }

  ngOnInit(): void {
    this.fetchBilanData();
  }

  fetchBilanData(): void {
    this.loading = true;

    this.formsService.getBilan( this.patientId,this.doctorId).subscribe(
      (data) => {
        this.bilan = data;
        console.log(this.bilan)
        this.profName = this.bilan.profName;
        this.patientName = this.bilan.patientName;
        this.formulaires = this.bilan.formulaires;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching bilan data:', error);
        this.loading = false;
      }
    );
  }
  showTryDetails(formId: any, responsTry: any) {
    const fullUrl = this.route.serializeUrl(
      this.route.createUrlTree([
        '/patient/response-preview',
        this.patientId,
        this.doctorId,
        formId,
        responsTry
      ])
    );
  
    // Add the base URL (e.g., 'http://localhost:4200' in development)
    const baseUrl = "http://localhost:4200";
  
    // Open the full URL in a new tab
    window.open(baseUrl + fullUrl, '_blank');
  }
  
  
}
  