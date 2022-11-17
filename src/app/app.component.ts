import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoItem } from './servicio/CarritoItem';
import { CartService } from './servicio/CartService';
import { Producto } from './servicio/producto.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  mostrar=false;

  title = 'TP-TALLERWEB2';

  constructor(
    protected router:Router,
    private cartService: CartService,
  ){}

  productosEnCarrito: CarritoItem[]=[];
  cantidadTotal: number = 0;
  productosEnCarrito$!: Observable<Producto[]>;


  ngOnInit(): void {
    this.listarCarrito();
  }

  listarCarrito(){
    this.cartService.productosEnCarrito$.subscribe(
      productos=> {
        if(productos){
          this.productosEnCarrito= productos;
          this.cantidadTotal = productos.reduce((previo, actual) => previo + actual.cantidad, 0);
        }
        
      })
  }

  irHome(){
    this.router.navigate(['/home']);
  }

  irProductos(){
    this.router.navigate(['/productos']);
  }

  irCarrito(){
    this.router.navigate(['/carrito']);
  }

  irCuenta(){
    this.router.navigate(['/cuenta']);
  }
  
  irLogin(){
    this.router.navigate(['/login']);
  }

  irCerrar(){
    this.router.navigate(['/login']);
  }
    


}
