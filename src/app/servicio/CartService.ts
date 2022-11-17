import { BehaviorSubject, Observable } from "rxjs";
import { Producto } from "./producto.service";
import { CarritoItem } from "./CarritoItem";
import swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})
export class CartService {

    constructor(
        private http: HttpClient
    ){
        var productosEnCache = localStorage.getItem('cart');
        var carritoItem: CarritoItem[]=productosEnCache ? JSON.parse(productosEnCache) : [];
        this.cart.next(carritoItem);
    }

    private cart = new BehaviorSubject<CarritoItem[]>([]); 
    public productosEnCarrito$ = this.cart.asObservable();
    public alerta = '';

    agregarCarrito(producto:Producto) {
        let productosEnCarrito=this.cart.getValue();
        if(productosEnCarrito.length!=0){
            let productoIndex= productosEnCarrito.findIndex((index) =>index.producto.id==producto.id)
            if (productoIndex != -1) 
            productosEnCarrito[productoIndex].cantidad += 1;
        else {
            var newItem: CarritoItem = { producto:producto, cantidad: 1 };
            productosEnCarrito.push(newItem);
        }
        } else{
            productosEnCarrito = [];
            var newItem: CarritoItem = { producto: producto, cantidad: 1 };
            productosEnCarrito.push(newItem);
        }
        this.cart.next(productosEnCarrito);
        localStorage.setItem('cart', JSON.stringify(productosEnCarrito));
        swal.fire('Producto agregado correctamente' ,this.alerta, 'success');
    }

    borrarProductoDelCarrito(producto:CarritoItem) {
        let productosEnCarrito=this.cart.getValue();
        let productoIndex=productosEnCarrito.findIndex((index)=> index.producto.id==producto.producto.id);
        if(productoIndex!=-1){
            if(productosEnCarrito[productoIndex].cantidad!=1){
                productosEnCarrito[productoIndex].cantidad-=1;
            }else{
                productosEnCarrito.splice(productoIndex,1);
            }
        }else {
            productosEnCarrito.splice(productoIndex,1);
        }
        this.cart.next(productosEnCarrito);
        localStorage.setItem('cart', JSON.stringify(productosEnCarrito));
        swal.fire('Producto eliminado correctamente', this.alerta, 'success');
    }

    pagar(precio: number, cantidad: number): Observable<any> {
        let producto = {
            precio: precio,
            cantidad: cantidad
        }
        let url = '/api/carrito';
        return this.http.post(url, producto);
    }
}