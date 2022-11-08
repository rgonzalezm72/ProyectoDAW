import { Injectable } from '@angular/core';
import {IArticulo} from '../interfaces/i-articulo';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CargarArticulosService {
  private URLArticulos = 'https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/articulos.json';
  constructor(private http:HttpClient) {}

  getArticulos(): Observable<IArticulo[]> {
      return this.http.get<IArticulo[]>(this.URLArticulos);
  }

  getArticulo(id: string): Observable<IArticulo> {
    return this.http.get<IArticulo>('https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/articulos/' + id + '.json');
  }
}
