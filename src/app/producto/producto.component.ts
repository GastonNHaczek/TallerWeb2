import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../servicio/producto.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {CartService} from '../servicio/CartService'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  ListaProductos: Producto[] = [];
  search!: String;

  constructor(
    private cartService:CartService,
    private _productoService: ProductoService
  ){}

  ngOnInit(): void {
    this.listarProductos();
  }
  listarProductos(): void {
    this._productoService.getProductos().subscribe(
      res=> {
        console.log(res);
        this.ListaProductos = <any>res;
      }
    );
  }

  agregarCarrito(producto:Producto): void {
    this.cartService.agregarCarrito(producto);
  }
}