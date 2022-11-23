import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  /**
   * Según los valores que ponemos en el formulario nos registraremos en la web
   * creándose con ello un nuevo usuario usando el método para ello del DataService
   * @param form - Formulario para registrarse en la página web
   */
  registrarUsuario(form: NgForm) {
    const nombre = form.value.nombre;
    const apellidos = form.value.apellidos;
    const email = form.value.email;
    const password = form.value.password;
    this.dataService.registrarUsuario(nombre, apellidos, email, password, "usuario");
  }

}
