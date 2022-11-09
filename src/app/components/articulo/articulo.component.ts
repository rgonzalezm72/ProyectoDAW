import {Component, OnInit} from '@angular/core';
import {IArticulo} from "../../interfaces/i-articulo";
import {ActivatedRoute} from "@angular/router";
import {IUsuario} from "../../interfaces/i-usuario";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  // @ts-ignore
  articulo: IArticulo = null;

  // @ts-ignore
  autor: IUsuario = null;

  // @ts-ignore
  idArticulo;

  // @ts-ignore
  idAutor;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.idArticulo = params['id']);
    this.dataService.getArticulo(this.idArticulo).subscribe(articulo => {
      this.articulo = articulo;
      fetch('https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/usuarios/' + this.articulo.idAutor + '.json').then(
        respuesta => respuesta.json()
      ).then(data => this.autor = data).catch(
        error => console.log(error.message)
      );
    });
  }

}
