import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Carrito } from './carrito/carrito.component';
import { Cuenta } from './cuenta/cuenta.component';
import { Home } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';


const routes: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home},
  {path: 'productos', component: ProductoComponent },
  {path: 'cuenta', component: Cuenta},
  {path: 'carrito', component: Carrito}

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
