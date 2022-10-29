import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../servicio/CartService';
import { Producto, ProductoService } from '../servicio/producto.service';
import { CommonModule } from '@angular/common';
import { CarritoItem } from '../servicio/CarritoItem';
       


@Component({
  
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class Carrito implements OnInit{
  productosEnCarrito: CarritoItem[]=[];
  productosEnCarrito$!: Observable<Producto[]>;
  constructor(
    private cartService: CartService,
    ){
    }
    ngOnInit(): void {
      this.listarCarrito();
      //this.productosEnCarrito$=this.cartService.getProductosEnCarrito();
     // console.log(this.productosEnCarrito$);
    }
    listarCarrito(){
      /*
      this.productosEnCarrito$=this.cartService.getProductosEnCarrito();
      this.productosEnCarrito$.subscribe();
      console.log(JSON.stringify(this.productosEnCarrito));*/
      this.cartService.productosEnCarrito$.subscribe(
        productos=> {
          if(productos){
            this.productosEnCarrito= productos;
          }
          
        })
    }
    borrarProductoDeCarrito(producto:CarritoItem){}
}

