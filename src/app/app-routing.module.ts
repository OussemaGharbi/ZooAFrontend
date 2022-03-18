import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { VeterinaireComponent } from './veterinaire/veterinaire.component';

const routes: Routes = [
    {path:'veterinaire', component:VeterinaireComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
