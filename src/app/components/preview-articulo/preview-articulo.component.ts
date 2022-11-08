import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import {IArticulo} from "../../interfaces/i-articulo";
import {IUsuario} from "../../interfaces/i-usuario";

@Component({
  selector: 'app-preview-articulo, [app-preview-articulo]',
  templateUrl: './preview-articulo.component.html',
  styleUrls: ['./preview-articulo.component.css']
})
export class PreviewArticuloComponent implements OnInit {

  // @ts-ignore
  @Input() articulo: IArticulo;

  // @ts-ignore
  @Input() usuarios: IUsuarios[];

  // @ts-ignore
  usuario: IUsuario;

  constructor() { }

  ngOnInit(): void {
    for (let usuario of this.usuarios) {
      if (this.articulo.idAutor == usuario.id) {
        this.usuario = usuario;
      }
    }
  }

}
