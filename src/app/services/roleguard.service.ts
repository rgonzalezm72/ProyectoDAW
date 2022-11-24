import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {DataService} from "./data.service";
import firebase from "firebase/compat/app";

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) { }

  /**
   * Método para proteger las rutas exclusivas para admins en caso de que se haya o no iniciado sesión
   */
  canActivate(): boolean {
    if (firebase.auth().currentUser === null || this.dataService.rol !== "admin") {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
