import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsService } from 'src/app/demo/service/forms/forms.service';
import { AuthService } from 'src/app/demo/service/auth/auth.service';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss']
})
export class BilanComponent {
  profName: string;
  patientName: string;
  formulaires: any[] = [];
  idPatient: any;
  bilan: any;
  loading: boolean = false;
  doctorId:any
  constructor(
    private http: HttpClient,
    private router: ActivatedRoute,
    private route:Router,
    private formsService: FormsService,
    private authService: AuthService,

  ) {
    this.idPatient = this.router.snapshot.paramMap.get('patientId');
    this.doctorId = this.authService.getUserId();

  }

  ngOnInit(): void {
    this.fetchBilanData();
  }

  fetchBilanData(): void {
    this.loading = true;

    this.formsService.getBilan(this.idPatient, this.doctorId).subscribe(
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


  downloadPDF(): void {
    const data = {
      patientId: this.idPatient,
      doctorId:this.doctorId
    };
  
    this.formsService.generateBilanPDF(data).subscribe(
      (response: ArrayBuffer) => {
        // Convert the response into a Blob
        const blob = new Blob([response], { type: 'application/pdf' });
        
        // Create a link element to download the file
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'patient-report.pdf'; // Specify the file name
  
        // Append link to body
        document.body.appendChild(link);
  
        // Trigger the click event on the link to start download
        link.click();
  
        // Remove the link from the DOM
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error generating PDF:', error);
      }
    );
  }
  
  getVersion(idForm: any,tryNumber:any){
console.log(idForm)
   
    this.route.navigate([
     'doctor/response-preview',
     this.idPatient,
     this.doctorId,
     idForm,  
     tryNumber
   ]);



}
}