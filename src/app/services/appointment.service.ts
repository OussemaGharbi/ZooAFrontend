import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  api:string= "http://localhost:3000/api/"


  constructor(private http:HttpClient) {
   }
   getAppointments(id){
    return this.http.get(this.getApi() + 'appointement/' + id )

   }

   approveAppointment(id){
     return this.http.put(this.getApi() + 'appointement/' + id,'')
   }
   getApi(){
     return this.api 
   }
}
