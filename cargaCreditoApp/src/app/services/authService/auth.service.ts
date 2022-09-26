import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afauth: AngularFireAuth) { }
  isUserLogged:boolean = false;
  email:string="";
  async register(email:string,password:string)
  {
    try{
      return await this.afauth.createUserWithEmailAndPassword(email,password);
    }catch(error)
    {
      throw(error);
    }
  }

  async login(email:string,password:string)
  {
    try{
      this.isUserLogged=true;
      this.email=email;
      return await this.afauth.signInWithEmailAndPassword(email,password);
    }catch (error)
    {
      this.email="";

      throw(error);
    }
  }

  getUserLogged()
  {
     return this.afauth.authState;  
  }

  logout()
  {
    this.isUserLogged = false;
    this.email="";
    this.afauth.signOut();
  }
}
