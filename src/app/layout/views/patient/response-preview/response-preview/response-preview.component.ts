import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsService } from 'src/app/demo/service/forms/forms.service';

@Component({
  selector: 'app-response-preview',
  templateUrl: './response-preview.component.html',
  styleUrls: ['./response-preview.component.scss']
})
export class ResponsePreviewComponent {
  idForm:any;
  idDoctor:any;
  idPatient:any;
  tabRep :any;
  tryNumber:any;
  favoriteSeason: string;
  numbers: number[] = [];
  constructor( private router: ActivatedRoute,private _FormsService:FormsService) {
    for (let index = 0; index < 10000; index++) {
      this.numbers.push(index);
    }
    this.idPatient=this.router.snapshot.paramMap.get('idPatient');
    this.idDoctor=this.router.snapshot.paramMap.get('idDocter');
    this.idForm=this.router.snapshot.paramMap.get('idForm');
    this.tryNumber=this.router.snapshot.paramMap.get('tryNumber');

   }
   sliderMakeOptions(slider): any {
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
   console.log("here preview")
   /*  console.log('hhh',this.idForm,this.idDoctor,this.idPatient) */
    this._FormsService.getRep(this.idPatient,this.idDoctor,this.idForm, this.tryNumber).subscribe((res)=>{
     console.log(this.idPatient,this.idDoctor,this.idForm, this.tryNumber)
      this.tabRep=res
      /*  console.log('resss',this.tabRep.responses)  */
    })
  }

}
