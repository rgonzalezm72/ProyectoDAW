import {Component, OnInit} from '@angular/core';
import {IArticulo} from "../../interfaces/i-articulo";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  // @ts-ignore
  articulos: IArticulo[] = null;

  constructor(private dataService: DataService) { }

  /**
   * Al iniciar se cargan los artículos mediante el DataService
   */
  ngOnInit(): void {
    this.dataService.getArticulos().subscribe(listaArticulos => {
      this.articulos = listaArticulos;
    }, error => console.log(error), () => console.log('Fin de observable'));
  }

}
