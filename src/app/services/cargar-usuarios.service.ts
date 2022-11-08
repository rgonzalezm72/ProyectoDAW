import { Injectable } from '@angular/core';
import {IUsuario} from '../interfaces/i-usuario';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CargarUsuariosService {

  private URLUsuarios = 'https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json';
  constructor(private http:HttpClient) {}

  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.URLUsuarios);
  }
}
