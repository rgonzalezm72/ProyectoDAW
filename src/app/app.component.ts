import {Component, OnInit} from '@angular/core';
import firebase from "firebase/compat/app";
import {DataService} from "./services/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Younghelp';

  // @ts-ignore
  rolUsuario : string;

  constructor(private dataService: DataService) {
  }

  /**
   * Inicializar firebase cuando se inicia la página web
   */
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyA5d0I57rVE1CSr6yxpD8vv_K0C6bOz1YI",
      authDomain: "younghelp-ea422.firebaseapp.com",
      databaseURL: "https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "younghelp-ea422",
      storageBucket: "younghelp-ea422.appspot.com",
      messagingSenderId: "833119907407",
      appId: "1:833119907407:web:fa07a4b71075df5506043a",
      measurementId: "G-E6498DN3F8"
    });
  }

  /**
   * Método para comprobar si el usuario está logueado
   */
  estaLogueado() {
    return this.dataService.estaLogueado();
  }

  /**
   * Método para comprobar si el usuario es admin
   */
  esAdmin() {
    firebase.database().ref().child("usuarios/" + firebase.auth().currentUser?.uid).on('value', (data) => {
      this.rolUsuario = data.child("rol").val();
    });
    return this.rolUsuario == "admin";
  }

  /**
   * Método para comprobar si el usuario es un usuario normal
   */
  esUsuario() {
    firebase.database().ref().child("usuarios/" + firebase.auth().currentUser?.uid).on('value', (data) => {
      this.rolUsuario = data.child("rol").val();
    });
    return this.rolUsuario == "usuario";
  }

  /**
   * Método para cerrar sesión
   */
  cerrarSesion() {
    return this.dataService.cerrarSesion();
  }
}
