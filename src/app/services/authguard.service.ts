import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {DataService} from "./data.service";

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public router: Router, private dataService: DataService) { }

  /**
   * Método para proteger las rutas exclusivas para usuarios registrados en caso de que no se haya iniciado sesión
   * o en caso de que no sean admins
   */
  canActivate(): boolean {
    if (this.dataService.getIdToken() === null || this.dataService.getIdToken() === "") {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
