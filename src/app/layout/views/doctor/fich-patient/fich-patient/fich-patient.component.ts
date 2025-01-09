import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { FormsService } from 'src/app/demo/service/forms/forms.service';
import { PatientService } from 'src/app/demo/service/patient/patient.service';

@Component({
  selector: 'app-fich-patient',
  templateUrl: './fich-patient.component.html',
  styleUrls: ['./fich-patient.component.scss']
})
export class FichPatientComponent implements OnInit {
 patientDetails: any; // Input property to accept patient data
  patientForm: FormGroup;
  isEditMode: boolean = false; // Flag for toggling edit mode
  patientId:any
  allCompletedForms: any[] = []; // Store all completed forms
  allInCompletedForms: any[] = []; // Store all incomplete forms
  constructor(private fb: FormBuilder,
    private _PatientService:PatientService,
    private router:ActivatedRoute,
    private authService: AuthService,
    private _FormsService: FormsService,
    

  ) {}

  ngOnInit() {
    this.patientId=this.router.snapshot.paramMap.get('patientId')
    this.getpatientById();
    this.getpatientForm()
  }

  getpatientById() {
   this._PatientService.patietnById(this.patientId).subscribe((res)=>{
    this.patientDetails=res;
    console.log(this.patientDetails)
   })
  }


  getpatientForm() {
    const doctorId = this.authService.getUserId();

    this._FormsService.getForms(this.patientId, doctorId).subscribe({
      next: (response) => {
        this.allCompletedForms = response.completed || [];
console.log(response)
        this.allInCompletedForms = response.incompleted || [];

      },
      error: (err) => {
        console.error('Erreur lors de la récupération des formulaires :', err);
     
      },
    });
  }
}
