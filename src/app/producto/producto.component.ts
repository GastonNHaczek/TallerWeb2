import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../servicio/producto.service';
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  ListaProductos: Producto[] = [];
  search!: String;
  constructor(
    private _productoService: ProductoService
  ){}

  ngOnInit(): void {
    this.listarProductos();
  }

  listarProductos() {
    this._productoService.getProductos().subscribe(
      res=> {
        console.log(res);
        this.ListaProductos = <any>res;
      }
    );
  }
}