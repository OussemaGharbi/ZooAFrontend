import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  createUser(email: string, password: string){
    const authData = new AuthData(email,password);
    console.log(authData);
    this.http.post("http://localhost:3000/api/user/signup",authData).subscribe(response => {
      console.log(response);
    })
  }

  login(email: string, password: string){
    const authData = new AuthData(email,password);
    this.http.post<{token:string,expiresIn:number}>("http://localhost:3000/api/user/login",authData).subscribe(response => {
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
    if(!token || !expirationDate) return;
    return {token:token,expirationDate:new Date(expirationDate)}
  }
}
