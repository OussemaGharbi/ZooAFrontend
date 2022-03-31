import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NewPostComponent } from '../post/new-post/new-post.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  isAuthenticated: boolean = false;
  constructor(private popup:MatDialog,private router: Router,private authService:AuthService) { }

  ngOnInit(): void {
  this.isAuthenticated = this.authService.isAuthenticated;
   this.user=this.authService.getUser();
  }
   
   openDialog(){
<<<<<<< HEAD
     this.authService.checkAuth()
     if (this.isAuthenticated){
   const dialogRef=this.popup.open(NewPostComponent)
   dialogRef.afterClosed().subscribe(() => {
     this.router.navigate(['']);
   })}
=======
     this.authService.checkAuth();
     if(this.isAuthenticated){
      const dialogRef=this.popup.open(NewPostComponent)
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigate(['']);
      })
     }
>>>>>>> 43bd54d2346521c6e0860f8638f3db38e6fb69ab
  }
  logout(){
    this.authService.logout();
  }

}
