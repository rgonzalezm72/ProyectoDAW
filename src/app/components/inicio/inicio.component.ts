import {Component, OnInit, Output} from '@angular/core';
import {IArticulo} from "../../interfaces/i-articulo";
import {DataService} from "../../services/data.service";
import {IUsuario} from "../../interfaces/i-usuario";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  // @ts-ignore
  articulos: IArticulo[] = null;

  // @ts-ignore
  usuarios: IUsuario[] = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getArticulos().subscribe(listaArticulos => {
      this.articulos = listaArticulos;
    }, error => console.log(error), () => console.log('Fin de observable'));
  }

}
