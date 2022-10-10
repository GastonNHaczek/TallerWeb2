import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductoService } from '../servicio/producto.service';

export interface ProductoElement {
  name: string;
  src: string;
}

const ELEMENT_DATA: ProductoElement[] = [
  {name: 'Computadora', src: ''},
  {name: 'Teclado', src: 'slide4.png'}
];
@Component({
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  
  displayedColumns: string[] = ['name', 'url'];
  dataSource = ELEMENT_DATA;
  nombreProducto: string;
  busqueda = '';
  subscripcion: Subscription;

  constructor(private _productoService: ProductoService){  
    this.nombreProducto = '';
    this.subscripcion =  this._productoService.getBusqueda().subscribe(data => {
      this.busqueda = data;
      this.obtenerProducto();
    })
  }

  buscarProducto() {
    if(this.nombreProducto === '') { 
      this._productoService.setError('Por favor ingrese un producto a buscar') 
      return;
    }
    this._productoService.busqueda(this.nombreProducto)
  }

  obtenerProducto() {
    this._productoService.getProducto(this.busqueda).subscribe(data =>{
      console.log(data);
    });
  }
}