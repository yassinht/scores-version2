import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  URL=environment.urlBackend

  constructor(private http: HttpClient) {}

  getAllPatients(){
    return this.http.get<any>(`${this.URL}`+'patient/')
    
    }

    emailIsExist(email: any) {
      console.log(email);
      return this.http.post(`${this.URL}patient/add-patient-with-email`, { email });
    }
    
   
    createPatientByEmail(email: any,password:any) {
      return this.http.post(`${this.URL}patient/create-not-confirmed-account`, { email,password });
    }
    
    updatePasswordOnly(id,body){
      return this.http.put<any>(`${this.URL}patient/update/passwordonly/${id}`,body)
    }

    updateDataOnly(payload: { id: string; data: any; password: string }): Observable<any> {
      return this.http.put(`${this.URL}patient/update/dataonly/${payload.id}`, {
        data: payload.data,
        password: payload.password
      });
    }


    completeProfile(body:any){
 
      return this.http.put(`${this.URL}`+'patient/complete-profile',body)
    }


    
    patietnById(id:any){
 
      return this.http.get(`${this.URL}`+'patient/'+id)
    }

}
