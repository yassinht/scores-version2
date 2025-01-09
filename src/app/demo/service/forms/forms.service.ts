import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  URL=environment.urlBackend

  constructor(private http: HttpClient) {}



  getAllVersions(idUser:any,idDooc:any,idForm:any ){


    return this.http.get<any>(`${this.URL}response/getresponsetriesdates/${idUser}/${idDooc}/${idForm}`)  
  
  }



  getForms(id:any,body){
  
      return this.http.get<any>(`${this.URL}`+'affect/getallform/'+id+'/'+body)  
    
    }


    getFormsById(idForm:any){

      return this.http.get<any>(`${this.URL}`+'forms/getformsbyid/'+idForm)  
    
    }


    necessaryFormData(): Observable<any> {
      return this.http.get<any>(`${this.URL}` + 'forms/necessaryformdata/',);
    }
    getMyForms(): Observable<any> {
      return this.http.get<any>(`${this.URL}` + 'forms/getforms/',);
    }
    getBilan(userId:any,doctorId:any ): Observable<any>{
 
      return this.http.get<any>(`${this.URL}response/bilan/${userId}/${doctorId}`)
    }

    generateBilanPDF(data: any): Observable<any> {
      return this.http.post(`${this.URL}response/generate-pdf`, data, { responseType: 'arraybuffer' });
    }
    affectForm(id:any,body:any){
  
      return this.http.post<any>(`${this.URL}`+'affect/addaffectation',body)  
    
    }


    addRep(data){
      return this.http.post<any>(`${this.URL}`+'response/addresponseweb',data)  
    }
    getRep(idPatient:any,idDoc:any,idForm:any,tryNumber:any){
 
    
      return this.http.get<any>(`${this.URL}`+'response/getuserformresponse/'+idPatient+'/'+idDoc+'/'+idForm+'/'+tryNumber,)  
    }
 
    
}
