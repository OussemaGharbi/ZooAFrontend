import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { VeterinaireComponent } from './components/veterinaire/veterinaire.component';

import { AuthComponent } from './components/auth/auth.component';
import { SignupComponent } from './components/signup/signup.component';
import { TakeAppointmentComponent } from './components/take-appointment/take-appointment.component';


const routes: Routes = [
    {path:'veterinaire', component:VeterinaireComponent},
    {path:'login', component:AuthComponent},
    {path:'signup', component:SignupComponent},
    {path:'appointments/:id', component:AppointmentComponent},
    {path:'takeAppointment', component:TakeAppointmentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
