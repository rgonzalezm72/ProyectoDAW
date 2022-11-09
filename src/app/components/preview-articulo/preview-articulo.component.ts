import {Component, OnInit, Input} from '@angular/core';
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
  autor: IUsuario = null;

  constructor() { }

  ngOnInit(): void {
    fetch('https://younghelp-ea422-default-rtdb.europe-west1.firebasedatabase.app/usuarios/' + this.articulo.idAutor + '.json').then(
      respuesta => respuesta.json()
    ).then(data => this.autor = data).catch(
      error => console.log(error.message)
    );
  }

}
