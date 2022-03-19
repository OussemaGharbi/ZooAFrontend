import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from 'src/model/authData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token?: string;
  isAuthenticated?: boolean;

  constructor(private http:HttpClient,private router:Router) { }

  getToken(){ return this.token; }  
  private authStatusListener = new Subject<boolean>();
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  signup(form:FormGroup){
    let success;
    console.log(form.value)
    const user = {
      fname:form.value.fname,
      lname:form.value.lname,
      email:form.value.email,
      password:form.value.password,
      birthdate:form.value.birthdate,
      phone:form.value.phone,
    }
    this.http.post("http://localhost:3000/api/users/signup",user).subscribe(response => {
      if(response["error"]){
        success = false;
        return null;
      }
      success=true
      this.router.navigate(["/login"])

    })
    return success;
  }

  login(email: string, password: string){
    console.log(email)
    console.log(password)
    this.http.post<{token:string,expiresIn:number}>("http://localhost:3000/api/users/login",{email:email,password:password}).subscribe(response => {
      console.log(response);
      this.token=response.token;
      if(this.token){
        this.setAuthTimer(response.expiresIn)
        this.isAuthenticated=true;
        const now = new Date();
        const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
        this.saveAuthData(this.token,expirationDate)
        this.authStatusListener.next(true);
        this.router.navigate(["/"]);
      }

    })
    return this.token;
  }

  logout(){
    this.token="";
    this.isAuthenticated=false;
    this.authStatusListener.next(false)
    this.clearAuthData()
    this.router.navigate(["/"]);
  }

  setAuthTimer(expiresIn:number){
    setTimeout(() =>{
      this.logout();

    },expiresIn*1000);
  }
  autoAuthUser(){
    const authData = this.getAuthData();
    if(!authData){
      return;
    }
    const now = new Date();
    const expiresIn= authData.expirationDate.getTime()- now.getTime();
    if(expiresIn>0){
      this.token=authData.token;
      this.isAuthenticated=true;
      this.setAuthTimer(expiresIn/1000)
      this.authStatusListener.next(true);
    }
  }

  private saveAuthData(token:string, expirationDate:Date){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration",expirationDate.toISOString());
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("expiration"))
  }
  

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration")
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    if(!token || !expirationDate) return null;
    return {token:token,expirationDate:new Date(expirationDate)}
  }
}