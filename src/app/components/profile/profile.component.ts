import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User; 
  id:string; //id got from the params
  userId:string//id of the user connected
  public rating:number; //number
  rw: boolean;
  constructor(private authService:AuthService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:ParamMap) => {
      this.id=params.get('id');
      console.log(this.id);
      this.userId=this.authService.getUserId();
      if(this.id){
        
        this.authService.getUserById(this.id).subscribe(user => {
          this.user=user.user;
          this.rating=user.user.totalRatings;
          this.rw=false;
          console.log(this.user);
        });
      }else{
  
        this.authService.getUser().subscribe(user => {
          
          this.user=user.user;
          this.userId=user.user._id;
          this.id=user.user._id;
          this.rating=user.user.totalRatings;
          this.rw=true;
          console.log(this.user);
        });
      }
    })

  }

  rate(){
    console.log("working");
    this.authService.addRating(this.userId,this.id,this.rating).subscribe((el)=>{
      this.rating=el.value;
      console.log(this.rating);
      console.log("sent")
    })
  }


}
