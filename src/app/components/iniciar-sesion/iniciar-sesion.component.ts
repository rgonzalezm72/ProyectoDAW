import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  /**
   * Según los valores que ponemos en el formulario iniciamos sesión en la página web
   * usando el método para ello del DataService
   * @param form - Formulario para iniciar sesión
   */
  iniciarSesion(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.dataService.iniciarSesion(email, password);
  }

}
