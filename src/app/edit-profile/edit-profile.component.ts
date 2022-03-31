import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    phone: new FormControl(''),
    birthdate: new FormControl(''),
  });
  user:User;
  constructor(private authService:AuthService,public router:Router) {

   }

  ngOnInit(): void {
    console.log('hello from onInit')
    this.authService.getUser().subscribe(user => {
      this.user=user.user;
      console.log(this.user);
    });
    
  }

  onImagePicked(imageInput: any) {
    const file : File = imageInput.files[0];
    this.profileForm.patchValue({image: file});

}
  onSubmit(){
    if(this.profileForm.valid){
      this.authService.updateUser(this.profileForm.value).subscribe(user => {
        this.router.navigate(["profile"]);
      })
    }
  }


}
