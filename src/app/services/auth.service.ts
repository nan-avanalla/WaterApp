import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;
  private loggedInUser: string = "";

  constructor(
    private http: HttpClient,
    private storage: Storage) 
  {
    // this.loadUserProfile();
  }

  isAuthenticated() {
    this.storage.get("USER_ID").then(value => { this.loggedInUser = value; this.isLoggedIn = true;});
    return this.isLoggedIn;
  }

  loggedInUserName() {
    this.storage.get("USER_ID").then(value => { this.loggedInUser = value; this.isLoggedIn = true;});
    return this.loggedInUser;
  }

  validateUserCredentials(userName: string, password: string) {
    return this.http.get(
      `${environment.baseApiUrl}login/auth?userName=`+userName+`&password=`+password, {responseType: 'text'}
    )
  }

  // validateUserCredentials(userName: string, password: string) {
  //   this.http.get(
  //     `${environment.baseApiUrl}login/auth?userName=`+userName+`&password=`+password, {responseType: 'text'}
  //   ).subscribe(response => {
  //     if(response === userName) {
  //       this.storage.set("USER_ID", userName);
  //       this.loggedInUser = userName;
  //     }
  //   })
  // }

  async loadUserProfile() {
    alert('from loadUserProfile');
    await this.storage.get("USER_ID").then(value => { this.loggedInUser = value; this.isLoggedIn = true;});
  }

  logOutUser(userName: string){
    this.isLoggedIn = false;
    this.storage.remove(userName);
  }
}
