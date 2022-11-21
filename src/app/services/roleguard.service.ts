import { Injectable } from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {DataService} from "./data.service";
import firebase from "firebase/compat/app";
import {IUsuario} from "../interfaces/i-usuario";
@Injectable()
export class RoleGuardService implements CanActivate {

  constructor(public dataService: DataService, public router: Router) { }

  // @ts-ignore
  usuario: IUsuario = null;

  canActivate(): boolean {
    // @ts-ignore
    this.dataService.getUsuario(firebase.auth().currentUser?.uid).subscribe(datosUsuario => this.usuario = datosUsuario);
    if (firebase.auth().currentUser === null || this.usuario.rol !== "admin") {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
