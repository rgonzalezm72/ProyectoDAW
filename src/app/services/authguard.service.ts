import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import firebase from "firebase/compat/app";
@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  /**
   * Método para proteger las rutas exclusivas para usuarios registrados en caso de que no se haya iniciado sesión
   */
  canActivate(): boolean {
    if (firebase.auth().currentUser === null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
