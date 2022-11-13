import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoItem } from './servicio/CarritoItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'TP-TALLERWEB2';

  constructor(protected router:Router){};
  irHome(){
    console.log('ejecutando redirect');
 
    this.router.navigate(['/home']);
  }
  irProductos(){
    console.log('ejecutando redirect');
 
    this.router.navigate(['/productos']);
  }
  irCarrito(){
    console.log('ejecutando redirect');
 
    this.router.navigate(['/carrito']);
  }
  irCuenta(){
    console.log('ejecutando redirect');
 
    this.router.navigate(['/cuenta']);
  }

  irLogin(){
    console.log('ejecutando redirect');
 
    this.router.navigate(['/login']);
  }

  
}
