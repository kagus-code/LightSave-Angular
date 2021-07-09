import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://flash-save.herokuapp.com"
  constructor(private http:HttpClient) { }
  getAppliances():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/appliances/');
  }
  addAppliances(val:any){
    return this.http.post(this.APIUrl + '/appliances/',val);
  }
  updateAppliances(val:any){
    return this.http.put(this.APIUrl + '/appliances/',val);
  }
  deleteAppliances(val:any){
    return this.http.delete(this.APIUrl + '/single-app/'+val);
  }


  getCustomAppliances():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/custom-app/');
  }
  addCustomAppliances(val:any){
    return this.http.post(this.APIUrl + '/custom-app/',val);
  }
  updateCustomAppliances(val:any){
    return this.http.put(this.APIUrl + '/custom-app/',val);
  }
  deleteCustomAppliances(val:any){
    return this.http.delete(this.APIUrl + '/custom-app/'+val);
  }
 
}
