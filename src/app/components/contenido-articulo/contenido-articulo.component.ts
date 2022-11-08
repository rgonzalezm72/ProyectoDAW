import {Component, Input, OnInit} from '@angular/core';
import {IArticulo} from "../../interfaces/i-articulo";

@Component({
  selector: 'app-contenido-articulo, [app-contenido-articulo]',
  templateUrl: './contenido-articulo.component.html',
  styleUrls: ['./contenido-articulo.component.css']
})
export class ContenidoArticuloComponent implements OnInit {

  // @ts-ignore
  @Input() articulo: IArticulo;

  constructor() { }

  ngOnInit(): void {
  }

}
