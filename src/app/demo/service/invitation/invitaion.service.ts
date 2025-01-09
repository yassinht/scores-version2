import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvitaionService {
  URL=environment.urlBackend

  constructor(private http: HttpClient) {}

  /**
   * Get invitations by ID
   * @param id - The ID for fetching invitations
   * @returns Observable of the API response
   */
  getInvts(id: any): Observable<any> {
    return this.http.get<any>(`${this.URL}invitation/getdemande/${id}`);
  }

  /**
   * Accept invitation
   * @param id - The invitation ID
   * @param body - Data to be updated
   * @returns Observable of the API response
   */
  acceptInvts(id: any, body: any): Observable<any> {
    return this.http.put<any>(`${this.URL}invitation/updatedemande/${id}`, body);
  }


  myContactsDoctor(id:any): Observable<any>{

    return this.http.get<any>(`${this.URL}`+'invitation/getmydoctor/'+id,)   }


    sendInvitation(doctorId: string, patientId: string): Observable<any> {
      const payload = { doctor: doctorId, patient: patientId };
      return this.http.post(`${this.URL}invitation/adddemande`, payload);
    }



    myContactsPatient(id: any): Observable<any> {  
      return this.http.get<any>(`${this.URL}` + 'invitation/getmypatient/' + id, )}


  }
