import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {IArticulo} from "../../interfaces/i-articulo";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-redactar',
  templateUrl: './redactar.component.html',
  styleUrls: ['./redactar.component.css']
})
export class RedactarComponent implements OnInit {

  // @ts-ignore
  articulos: IArticulo[] = null;

  // @ts-ignore
  categorias = ["Estudios", "Trabajo", "Relaciones", "Salud"];

  // @ts-ignore
  categoriaSeleccionada = "Estudios";

  constructor(private dataService: DataService) { }

  /**
   * Al iniciarse se obtiene la lista de artículos usando para ello el DataService
   * con tal de obtener la cantidad de artículos que tiene la página web
   */
  ngOnInit(): void {
    this.dataService.getArticulos().subscribe(listaArticulos => {
      this.articulos = listaArticulos;
    }, error => console.log(error), () => console.log('Fin de observable'));
  }

  /**
   * Según los valores que ponemos en el formulario escribiremos un nuevo artículo
   * usando el método para ello del DataService
   * @param form - Formulario para escribir un nuevo artículo
   */
  subirArticulo(form: NgForm) {
    const titulo = form.value.titulo;
    const categoria = this.categoriaSeleccionada;
    const contenido = form.value.contenido;
    this.dataService.subirArticulo(titulo, categoria, contenido, this.articulos.length);
  }

}
