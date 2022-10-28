import { Observable } from "rxjs";
import { Producto } from "./producto.service";
import { Subject } from 'rxjs';

export class CartService{
    private productosEnCarrito$ = new Subject<Producto[]>();
    productosEnCarrito: Producto[]=[];
    constructor(){
    }

    agregarCarrito(producto:Producto){
        this.productosEnCarrito.push(producto);
        this.productosEnCarrito$.next(this.productosEnCarrito);
        console.log(this.productosEnCarrito);
    }
    getProductosEnCarrito(): Observable<Producto[]>{
        return this.productosEnCarrito$.asObservable();
    }
    

  

}