import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IArticulo} from "../interfaces/i-articulo";
import {IUsuario} from "../interfaces/i-usuario";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private router: Router, private cookies: CookieService, private http:HttpClient) { }

  private URLArticulos = 'https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/articulos.json';

  private URLUsuarios = 'https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/usuarios.json';

  // @ts-ignore
  token : string;

  // @ts-ignore
  idUsuario: string;

  // @ts-ignore
  usuario: string[];

  iniciarSesion(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        firebase.auth().currentUser?.getIdToken().then(
          token => {
            this.token = token;
            this.cookies.set("token",this.token);
            this.router.navigate(['/']);
          }
        );
      }
    );
  }
  getIdToken(){
    return this.cookies.get("token");
  }

  estaLogueado() {
    return this.cookies.get("token");
  }

  cerrarSesion() {
    firebase.auth().signOut().then(()=> {
      this.token = "";
      this.cookies.set("token",this.token);
      this.router.navigate(['/']);
    })
  }
   registrarUsuario(nombre:string, apellidos:string, email: string, password: string) {
     firebase.auth().createUserWithEmailAndPassword(email, password).then(
       response => {
         firebase.auth().signInWithEmailAndPassword(email, password).then(
           response => {
             firebase.auth().currentUser?.getIdToken().then(
               token => {
                 this.token = token;
                 this.cookies.set("token",this.token);
                 // @ts-ignore
                 this.idUsuario = firebase.auth().currentUser?.uid;
                 firebase.database().ref().child("usuarios").child(this.idUsuario).set({
                     apellidos: apellidos,
                     email: email,
                     id: firebase.auth().currentUser?.uid,
                     nombre: nombre,
                     password: password,
                     rol: "usuario"
                   });
                 this.router.navigate(['/']);
               }
             );
           }
         );
       }
     );
   }

   configurarUsuario(nombre:string, apellidos:string, email: string, password: string) {
     firebase.auth().currentUser?.getIdToken().then(
       token => {
         this.token = token;
         this.cookies.set("token",this.token);
         // @ts-ignore
         this.idUsuario = firebase.auth().currentUser?.uid;
         firebase.auth().currentUser?.updateEmail(email);
         firebase.auth().currentUser?.updatePassword(password);
         firebase.database().ref().child("usuarios").child(this.idUsuario).update({
           apellidos: apellidos,
           email: email,
           nombre: nombre,
           password: password
         });
         this.router.navigate(['/configuracion']);
       }
     );
   }

  getArticulos(): Observable<IArticulo[]> {
    return this.http.get<IArticulo[]>(this.URLArticulos);
  }

  getArticulo(id:string) : Observable<IArticulo> {
    return this.http.get<IArticulo>('https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/articulos/' + id + ".json");
  }

  getUsuarios(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(this.URLUsuarios);
  }

  getUsuario(id:string) : Observable<IUsuario> {
     return this.http.get<IUsuario>('https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/usuarios/' + id + ".json");
  }

   subirArticulo(titulo: string, categoria: string, contenido: string, numeroArticulos : number){
     firebase.database().ref().child("articulos").child((numeroArticulos).toString()).set({
       contenido: contenido.split('\n'),
       id: (numeroArticulos + 1).toString(),
       idAutor: firebase.auth().currentUser?.uid,
       seccion: categoria,
       titulo: titulo
     });
     this.router.navigate(['/']);
   }
}
