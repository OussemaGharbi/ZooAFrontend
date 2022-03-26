import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NewPostComponent } from '../post/new-post/new-post.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private popup:MatDialog,private router: Router) { }

  ngOnInit(): void {
  }
   openDialog(){
   const dialogRef=this.popup.open(NewPostComponent)
   dialogRef.afterClosed().subscribe(() => {
     this.router.navigate([''])
   })

  }

}
