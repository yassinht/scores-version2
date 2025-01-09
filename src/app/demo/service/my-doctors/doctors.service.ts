import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  URL=environment.urlBackend

  constructor(private http: HttpClient) {}

  myContactsDoctor(id:any): Observable<any>{

    return this.http.get<any>(`${this.URL}`+'invitation/getmydoctor/'+id,)   }

   

    
    updatePasswordOnly(id,body){
      return this.http.put<any>(`${this.URL}doctor/update/passwordonly/${id}`,body)
    }

    updateDataOnly(payload: { id: string; data: any; password: string }): Observable<any> {
      return this.http.put(`${this.URL}doctor/update/dataonly/${payload.id}`, {
        data: payload.data,
        password: payload.password
      });
    }
    
}
