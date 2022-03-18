import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from 'src/model/User';

@Injectable({
  providedIn: 'root'
})
export class VeterinaireService {

  api:string= "http://localhost:3000/api/"

  veterinaires: User[] =[]
  constructor(private http:HttpClient) { 

  
  }

  getApi(){
    return this.api
  }

  getVeterinaires() {
   return  this.http.get(this.api + 'veterinaire/')
  }
  delete(id){
    return this.http.delete(this.api + 'veterinaire/'+id )

  }
}
