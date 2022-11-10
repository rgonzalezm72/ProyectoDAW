import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {IUsuario} from "../../interfaces/i-usuario";
import firebase from "firebase/compat/app";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  // @ts-ignore
  usuario : IUsuario = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.dataService.getUsuario(firebase.auth().currentUser?.uid).subscribe( usuario => this.usuario = usuario);
  }

  configurarUsuario(form: NgForm) {
    const nombre = form.value.nombre;
    const apellidos = form.value.apellidos;
    const email = form.value.email;
    const password = form.value.password;
    this.dataService.configurarUsuario(nombre, apellidos, email, password);
  }

}
