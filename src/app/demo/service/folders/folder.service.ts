import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FolderService {


  URL=environment.urlBackend
  private _Folders=this.URL+'dossier/';
  private _Doctor=this.URL+'doctor/';
  private _FolderContent =this.URL+'inside/';

  constructor(private http: HttpClient) {}


  GetAllFolders(){
return this.http.get<any>(`${this._Folders}`)
  }
  getMyFolders(id:any){
    return this.http.get<any>(`${this._Doctor}dossiers`)

  }
  GetFolderById(id){
    return this.http.get<any>(`${this._FolderContent}getmyform/${id}`)
  }
}
