import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../servicio/producto.service';
import {CartService} from '../servicio/CartService'
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(
    private cartService:CartService,
    private _productoService: ProductoService
  ){}
    
  ListaProductos: Producto[] = [];
  filterPost = '';
  search!: String;

  ngOnInit(): void {
    this.listarProductos();
  }
  
  listarProductos(): void {
    this._productoService.getProductos().subscribe(
      res=> {
        this.ListaProductos = <any>res;
      }
    );
  }

  agregarCarrito(producto:Producto): void {
    this.cartService.agregarCarrito(producto);
  }
}