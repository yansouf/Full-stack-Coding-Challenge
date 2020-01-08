import { Injectable, PLATFORM_ID, Inject, EventEmitter } from '@angular/core';
import { User } from '../Models/models';

const USER = 'USER';
const TOKEN = 'TOKEN';
const ROLE = 'ROLE';
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  public user = new User();
  public token = ''; 
  public notif: EventEmitter<{ is: boolean, user: User}> = new EventEmitter();
  constructor() {
    this.getSession();
  }
  // se connecter
  public doSignIn(user: User, token) {
    if (!user || !token) {
      return;
    }
    this.user = user;
    this.token = token;
    localStorage.setItem(USER, (JSON.stringify(this.user)));
    localStorage.setItem(TOKEN, (JSON.stringify(this.token))); 
    this.notif.next({ is: true, user: this.user });
  }

  // se deconnecter
  public doSignOut(): void {
    this.user = new User();
    localStorage.removeItem(USER);
    localStorage.removeItem(TOKEN); 
    this.notif.next({ is: false, user: this.user });
  }

  // this methode is for our auth guard
  get isSignedIn(): boolean {
    console.log(!!localStorage.getItem(USER) ||
    !!localStorage.getItem(TOKEN) ||
    !!localStorage.getItem(ROLE));
    return !!localStorage.getItem(USER) ||
      !!localStorage.getItem(TOKEN)  
      ;
  }

  public getSession(): void {
    try {
      this.user = JSON.parse(localStorage.getItem(USER));
      this.token = JSON.parse(localStorage.getItem(TOKEN)); 
      // this.user = JSON.parse(atob(localStorage.getItem(USER)));
      // this.token = JSON.parse(atob(localStorage.getItem(TOKEN)));
      // this.idRole = JSON.parse(atob(localStorage.getItem(ROLE)));
      this.notif.next({ is: true, user: this.user });
    } catch (error) {
      this.user = new User();
      this.token = ''; 
      console.warn('error localstorage data', error);
    }

    // console.log('token here : ', this.token);
    // console.log('idRole here : ', this.idRole);
  }
}

// class User {
//   id: 0;
//   name = '';
// }

