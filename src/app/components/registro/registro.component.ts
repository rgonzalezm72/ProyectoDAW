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

  registrarUsuario(form: NgForm) {
    const nombre = form.value.nombre;
    const apellidos = form.value.apellidos;
    const email = form.value.email;
    const password = form.value.password;
    this.dataService.registrarUsuario(nombre, apellidos, email, password, "usuario");
  }

}
