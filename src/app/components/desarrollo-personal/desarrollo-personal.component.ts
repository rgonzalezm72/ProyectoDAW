import {Component, OnInit} from '@angular/core';
import {IArticulo} from "../../interfaces/i-articulo";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-desarrollo-personal',
  templateUrl: './desarrollo-personal.component.html',
  styleUrls: ['./desarrollo-personal.component.css']
})
export class DesarrolloPersonalComponent implements OnInit {

  // @ts-ignore
  articulos: IArticulo[] = null;

  // @ts-ignore
  articulosFiltrados: IArticulo[] = null;

  // @ts-ignore
  categorias = ["Todos", "Estudios", "Trabajo", "Relaciones", "Salud"];

  // @ts-ignore
  categoriaSeleccionada = "Todos";

  constructor(private dataService: DataService) { }

  /**
   * Al iniciarse se cargan los artículos mediante el método en cuestión
   */
  ngOnInit(): void {
    this.cargarListaArticulos();
  }

  /**
   * Método con el cual se carga la lista de artículos correspondiente usando el DataService
   */
  cargarListaArticulos(): void {
    this.dataService.getArticulos().subscribe(listaArticulos => {
      this.articulosFiltrados = [];
      this.articulos = listaArticulos;
      for (let articulo of this.articulos) {
        if (this.categoriaSeleccionada != "Todos") {
          if (this.categoriaSeleccionada == articulo.seccion){
            this.articulosFiltrados.push(articulo);
          }
        } else {
          this.articulosFiltrados = this.articulos;
        }
      }
    }, error => console.log(error), () => console.log('Fin de observable'));
  }
}
