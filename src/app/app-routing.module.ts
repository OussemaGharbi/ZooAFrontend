import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { VeterinaireComponent } from './veterinaire/veterinaire.component';

const routes: Routes = [
  {path: '', children: [
    {path:'veterinaire', component:VeterinaireComponent},
    {path:'appointments/:id', component:AppointmentComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
