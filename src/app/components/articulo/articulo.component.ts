import {Component, Input, OnInit, Output} from '@angular/core';
import {IArticulo} from "../../interfaces/i-articulo";
import {ActivatedRoute} from "@angular/router";
import {IUsuario} from "../../interfaces/i-usuario";

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.css']
})
export class ArticuloComponent implements OnInit {

  // @ts-ignore
  @Input() articulo: IArticulo;

  // @ts-ignore
  autor: IUsuario = null;

  // @ts-ignore
  idArticulo;

  // @ts-ignore
  idAutor;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.idArticulo = params['id']);
    this.idAutor = this.articulo.idAutor;
  }

}
