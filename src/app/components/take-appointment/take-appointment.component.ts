import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-take-appointment',
  templateUrl: './take-appointment.component.html',
  styleUrls: ['./take-appointment.component.css']
})
export class TakeAppointmentComponent implements OnInit {
  selected:string
  Hours=['08:00','09:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00','17:00']
  id = "623355cf23bf0b4ca97ebcf8"
  Appointment = new FormControl();
  // table:string[]=[]
  appointments:any

  constructor(private appointmentService:AppointmentService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    
     this.appointmentService.getAppointments(this.id).subscribe(appointments=>{
      this.appointments = appointments;
      console.log(this.appointments);
      // console.log(this.appointments[0]['date'].slice(11,16))
      // console.log(this.Hours.includes('00:00'));
      this.appointments.forEach(element => {
        
       if(this.Hours.includes(element['date'].slice(11,16))){
         this.Hours.splice(this.Hours.indexOf(element['date'].slice(11,16)),1);
       }
    
        
      });
      // console.log(this.table);
      
      // this.table = this.appointments.filter((x)=>{
      //   this.Hours.includes(x['date'].slice(11,16))
      //   // console.log(x['date'].slice(11,16));
         
      // })
      // console.log(this.table)
      

    })

  }
 
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  AvailableHour(){

  }


}


