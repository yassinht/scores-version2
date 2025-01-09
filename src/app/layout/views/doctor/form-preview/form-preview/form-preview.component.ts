import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { FormsService } from 'src/app/demo/service/forms/forms.service';
import { InvitaionService } from 'src/app/demo/service/invitation/invitaion.service';
import { Options } from '@angular-slider/ngx-slider';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss'],
  providers: [MessageService],

})
export class FormPreviewComponent {
  disabled = true; // Set this to true to disable inputs

  formId:any;
  form: any;
  selectedValues: string[] = []; // To store the selected radio button values
  textcourt: string = '';
  Nomberdej: number | null = null;
  showOverlay: boolean = false;
  sliderOptions: any = {}; // Configuration du slider pour chaque question
  selectedValue: number = 1;
  patients: any[] = [];

  // Définition des étapes et légendes
  ranges = [
    { value: 1, legend: '0 – 30mn' },
    { value: 2, legend: '30-60mn' },
    { value: 3, legend: '1 à 2h' },
    { value: 4, legend: '2 à 3h' },
    { value: 5, legend: '3 à 4h' }
  ];

  constructor(
    private router: ActivatedRoute,
    private _FormsService:FormsService,
    private authService: AuthService,
    private _InvitaionService: InvitaionService,


  )
{
  this.formId = this.router.snapshot.paramMap.get('id');

}



ngOnInit(): void {
  this._FormsService.getFormsById(this.formId).subscribe((response) => {
    this.form = response;
    console.log(this.form)
  });
}
sliderMakeOptions(slider): Options {
  return {
    floor: 10,
    ceil: 100,
    step: 10,
    showTicks: true,
    stepsArray: slider.dataRange,
    disabled: true // Disable the slider here

  };
}

getSliderValues(dataRange: any[]): number[] {
  console.log("dataRange:", dataRange); // Log the full dataRange array
  const values = dataRange.map((item) => item.value);
  console.log("Slider values:", values); // Log the extracted values
  return values;
}

getSliderStep(dataRange: any[]): number {
  if (dataRange.length < 2) {
    return 1; // Default step if only one value exists
  }
  return dataRange[1].value - dataRange[0].value; // Calculate step based on consecutive values
}
fetchPatients() {
  const doctorId = this.authService.getUserId();
  this._InvitaionService.myContactsPatient(doctorId).subscribe({
    next: (data) => {
      this.patients = data.map((patient) => ({
        ...patient,
      }));
      console.log(this.patients);
    },
    error: (err) => {
      console.error('Error fetching patients:', err);
     
    },
  });
}


getdataRangeBar(
  question: any,
  dataRange: any,
  q: number,
  o: number,
  event: any,
  sectionIndex: number,
  sliderInstance: any
): void {
  question.data = event.value; // Met à jour la valeur actuelle du slider
  console.log(`Valeur sélectionnée pour la question ${q}:`, event.value);
}
 // Méthode pour traiter le changement de valeur
 onSliderChange(event: any) {
  console.log('Valeur sélectionnée:', this.selectedValue);
}



}
