import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import firebase from "firebase/compat/app";
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(): boolean {
    if (firebase.auth().currentUser === null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
