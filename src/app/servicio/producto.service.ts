import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  clasificacion: string;
  precio: number;
  imagen: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url = '/api';
  constructor(
    private http: HttpClient
    ){}

    //get productos
    getProductos(){
      return this.http.get(this.url);
    }

    getProductoById(id: number){
      return this.http.get(this.url + '/' +id)
    }

    agregarProducto(producto: Producto){
      return this.http.post(this.url, producto)
    }

    eliminarProducto(id: number){
      return this.http.delete(this.url + '/' + id)
    }

    modificarProducto(id: number, producto: Producto){
      return this.http.put(this.url + '/' + id, producto)
    }
}
