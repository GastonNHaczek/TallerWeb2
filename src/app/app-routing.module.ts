import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Carrito } from './carrito/carrito.component';
import { Home } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { RegistrarComponent } from './registrar/registrar.component';


const routes: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home},
  {path: 'productos', component: ProductoComponent },
  {path: 'carrito', component: Carrito},
  {path: 'login', component: LoginComponent},
  {path: 'registrar', component: RegistrarComponent}
  

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
