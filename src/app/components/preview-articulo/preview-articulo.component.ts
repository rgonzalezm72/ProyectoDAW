import {Component, OnInit, Input} from '@angular/core';
import {IArticulo} from "../../interfaces/i-articulo";
import {IUsuario} from "../../interfaces/i-usuario";
import {DataService} from "../../services/data.service";

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

  constructor(private dataService: DataService) { }

  /**
   * Al iniciarse se cargan los datos del autor del artículo en cuestión usando para ello el DataService
   */
  ngOnInit(): void {
    this.dataService.getUsuario(this.articulo.idAutor).subscribe( usuario => this.autor = usuario);
  }

}
