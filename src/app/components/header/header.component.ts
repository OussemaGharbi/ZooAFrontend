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

  constructor(private popup:MatDialog,private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  
   openDialog(){
    if (!(this.authService.checkAuth())){
   const dialogRef=this.popup.open(NewPostComponent)
   dialogRef.afterClosed().subscribe(() => {
     this.router.navigate([''])
   })}

  }

}
