import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Veterinaire } from 'src/model/veterinaire';

@Injectable({
  providedIn: 'root'
})
export class VeterinaireService {

  api:string= "http://localhost:3000/api/"

  veterinaires: Veterinaire[] =[]
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
