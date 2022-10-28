import { BehaviorSubject, Observable } from "rxjs";
import { Producto } from "./producto.service";
import { Subject } from 'rxjs';

export class CartService{
    private cart = new BehaviorSubject<Array<Producto>>(new Array()); 
    public productosEnCarrito$ = this.cart.asObservable();
   
    constructor(){
    }

    agregarCarrito(producto:Producto){
        let productosEnCarrito=this.cart.getValue();
        productosEnCarrito.push(producto);
       // this.productosEnCarrito$.next(this.productosEnCarrito);
        //console.log(this.productosEnCarrito);
        this.cart.next(productosEnCarrito);
    }
    /*
    getProductosEnCarrito(): Observable<Producto[]>{
        return this.productosEnCarrito$.asObservable();
    }
    */

  

}