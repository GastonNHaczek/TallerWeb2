import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../servicio/CartService';
import { Producto, ProductoService } from '../servicio/producto.service';
import { CommonModule } from '@angular/common';
import { CarritoItem } from '../servicio/CarritoItem';
import swal from 'sweetalert2';
@Component({
  
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class Carrito implements OnInit{
  
  constructor(
    private cartService: CartService,
    ){}

  productosEnCarrito: CarritoItem[]=[];
  precioTotal: number = 0;
  cantidadTotal: number = 0;
  productosEnCarrito$!: Observable<Producto[]>;
  alerta: string ='';

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
          this.precioTotal = productos.reduce((sum, current) => sum + (current.producto.precio * current.cantidad), 0);
          this.productosEnCarrito= productos;
          this.cantidadTotal = productos.length;
        }
        
      })
  }
  borrarProductoDelCarrito(producto:CarritoItem){
    this.cartService.borrarProductoDelCarrito(producto);
    
  }

  pagar(): void {
    swal.fire('Pago realizado', this.alerta, 'success');
  }
}

