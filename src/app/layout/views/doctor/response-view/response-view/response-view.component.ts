import { Options } from '@angular-slider/ngx-slider';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/demo/service/forms/forms.service';

@Component({
  selector: 'app-response-view',
  templateUrl: './response-view.component.html',
  styleUrls: ['./response-view.component.scss']
})
export class ResponseViewComponent {


  showList: boolean = false;
  idForm:any;
  idDoctor:any;
  idPatient:any;
  tryNumber:any
  tabRep :any;
  patientIMC:Number
  tabScore:any;
  favoriteSeason: string;
  questionCount: number = 0; // Initialize the count variable
  numbers: number[] = [];
  patientData:any


  age : Number;
  isSliderDisabled: boolean = true; // Set to true to disable the slider initially

 

  constructor( private router: ActivatedRoute,private _FormsService:FormsService) {

   
   
    for (let index = 0; index < 10000; index++) {
      this.numbers.push(index);
    }
    this.idPatient=this.router.snapshot.paramMap.get('idPatient');
    this.idDoctor=this.router.snapshot.paramMap.get('idDocter');
    this.idForm=this.router.snapshot.paramMap.get('idForm');
    this.tryNumber=this.router.snapshot.paramMap.get('tryNumber');

   }

     /**
   * Generates options for the slider.
   * @param slider The slider element.
   * @returns Options for the slider.
   */

   sliderMakeOptions(slider): Options {
    /* console.log("llllll",slider) */
    return {
      floor: 10,
      ceil: 100,
      step: 10,
      showTicks: true,
 stepsArray:slider,  

}
   }
  ngOnInit(): void {
    this._FormsService.getRep(this.idPatient,this.idDoctor,this.idForm,this.tryNumber).subscribe((res)=>{
     console.log(this.idPatient,this.idDoctor,this.idForm,this.tryNumber)
      this.tabRep=res
      console.log(this.tabRep)
      this.questionCount = this.tabRep.responses.length; // Assign the value of the length of responses array to the count variable

    })

  }



}
