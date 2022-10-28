import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../servicio/CartService';
import { Producto, ProductoService } from '../servicio/producto.service';
import { CommonModule } from '@angular/common';
       


@Component({
  
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class Carrito implements OnInit{
 
  public productosEnCarrito: Producto[] = [];
  constructor(
      private cartService: CartService,
    ){
    }
    ngOnInit(): void {
      this.listarCarrito();
      
    }
    listarCarrito(){
      /*
      this.productosEnCarrito$=this.cartService.getProductosEnCarrito();
      this.productosEnCarrito$.subscribe();
      console.log(JSON.stringify(this.productosEnCarrito));*/
      this.cartService.getProductosEnCarrito().subscribe(
        res=> {
          this.productosEnCarrito = <any>res;
          console.log(res);
        }
      );
    }
   
/*
public items: Array<CartItem> = [];
    this.cartService.currentDataCart$.subscribe(x=>{
      if(x)
      {
        this.items = x;
        this.totalQuantity = x.length;
        this.totalPrice = x.reduce((sum, current) => sum + (current.product.price * current.quantity), 0);
      
      }
    })
*/
}