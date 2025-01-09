import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  URL = environment.urlBackend;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  // Register Patient
  registerPatient(body: any): Observable<any> {
    return this.http.post(`${this.URL}patient`, body);
  }

  // Login Patient
  loginPatient(body: any): Observable<any> {
    return this.http.post(`${this.URL}patient/login`, body);
  }

  // Check if Patient is Logged In
  isPatientLoggedIn(): boolean {
    return !!localStorage.getItem('patientToken');
  }

  // Save Patient Token
  savePatientToken(token: string): void {
    console.log("serviceeee",token)
    localStorage.setItem('patientToken', token);
    localStorage.setItem('userRole', '2'); // 2 for Patient
    let decodeToken = this.jwtHelper.decodeToken(token);
    localStorage.setItem('mailConfirmation', decodeToken.subject.mailConfirmation)
  }

  // Register Doctor
  registerDoctor(body: any): Observable<any> {
    return this.http.post(`${this.URL}doctor`, body);
  }

  // Login Doctor
  loginDoctor(body: any): Observable<any> {
    return this.http.post(`${this.URL}doctor/login`, body);
  }

  // Check if Doctor is Logged In
  isDoctorLoggedIn(): boolean {
    return !!localStorage.getItem('doctorToken');
  }

  // Save Doctor Token
  saveDoctorToken(token: string): void {
    localStorage.setItem('doctorToken', token);
    localStorage.setItem('userRole', '1'); // 1 for Doctor
  }

  // Logout User
  logout(role: 'Patient' | 'Doctor'): void {
    if (role === 'Patient') {
      localStorage.removeItem('patientToken');
    } else if (role === 'Doctor') {
      localStorage.removeItem('doctorToken');
    }
    localStorage.removeItem('userRole');
  }

  // Get User Role
  getUserRole(): string | null {
    const role = localStorage.getItem('userRole');
    if (role) {
      return role === '1' ? 'Doctor' : role === '2' ? 'Patient' : null;
    }
    return null;
  }

  // Get User ID from Token
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.subject._id || null; // Assuming 'id' is stored in the token
    }
    return null;
  }

  // Get User Name from Token
  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.subject.name || null; // Assuming 'name' is stored in the token
    }
    return null;
  }

    // Get User Email from Token
    getUserEmail(): string | null {
      const token = this.getToken();
      if (token) {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken?.subject.email || null; // Assuming 'email' is stored in the token
      }
      return null;
    }

  // Get Token from localStorage (either patient or doctor token)
  private getToken(): string | null {
    return localStorage.getItem('patientToken') || localStorage.getItem('doctorToken');
  }

  // Updated AuthService with decoded user data
  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token)?.subject || null;
    }
    return null;
  }

  // Get Full User Data (decoded token)
  getUserData(): any {
    const decodedData = this.getDecodedToken();
    if (decodedData) {
      return decodedData; // Return the full decoded data
    }
    return null; // Return null if no decoded data is available
  }
  
}
