import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {DataService} from "./data.service";

@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) { }

  /**
   * Método para proteger las rutas exclusivas para admins en caso de que se haya o no iniciado sesión
   */
  canActivate(): boolean {
    if (this.dataService.getIdToken() === null || this.dataService.getIdToken() === "" || this.dataService.getRol() !== "admin") {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
