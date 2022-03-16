import { Component, OnInit } from '@angular/core';
import { Veterinaire } from 'src/model/veterinaire';
import { VeterinaireService } from '../services/veterinaire.service';

@Component({
  selector: 'app-veterinaire',
  templateUrl: './veterinaire.component.html',
  styleUrls: ['./veterinaire.component.css']
})
export class VeterinaireComponent implements OnInit {
  veterinaires: Veterinaire[]=[]
  constructor(private veterinaireService:VeterinaireService) { }

  ngonchange() {}
  ngOnInit(): void {

  this.veterinaireService.getVeterinaires().subscribe(resultat=>{
    this.veterinaires=resultat as Veterinaire[];
    console.log(this.veterinaires)

  });

  }
  Delete(id){
    this.veterinaireService.delete(id).subscribe(resultat=>{
      console.log(resultat)
    })
  }

}
