import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../servicio/CartService';
import { Producto, ProductoService } from '../servicio/producto.service';
import { CommonModule } from '@angular/common';
import { CarritoItem } from '../servicio/CarritoItem';
import swal from 'sweetalert2';
import { LoginService } from '../servicio/LoginService';
import { Router } from '@angular/router';
@Component({
  
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class Carrito implements OnInit{
  
  constructor(
    protected router:Router,
    private cartService: CartService,
    private loginService: LoginService
  ){}

  productosEnCarrito: CarritoItem[]=[];
  precioTotal: number = 0;
  cantidadTotal: number = 0;
  productosEnCarrito$!: Observable<Producto[]>;
  alerta: string ='';

  get user() {return this.loginService.user};
  ngOnInit(): void {
    this.listarCarrito();
  }

  listarCarrito(){
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
    if (this.productosEnCarrito.length > 0) {
      if(this.user) {
        this.cartService.productosEnCarrito$.subscribe(
          productos=> {
            if(productos){
              this.precioTotal = productos.reduce((sum, current) => sum + (current.producto.precio * current.cantidad), 0);
              this.cantidadTotal = productos.reduce((previo, actual) => previo + actual.cantidad, 0);
            }
          })
        this.cartService.pagar(this.precioTotal, this.cantidadTotal, this.user.idToken.payload.email).subscribe();
        swal.fire('Pago realizado', this.alerta, 'success');
        this.productosEnCarrito = [];
        this.cantidadTotal = 0;
      }
      else {
        swal.fire('Debe iniciar sesion para realizar la compra', this.alerta, 'error');
        this.router.navigate(['/login']);
      }
    }
    else {
      swal.fire('Tu carrito esta vacio', this.alerta, 'warning');
    }
  }
}

