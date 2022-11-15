import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Footer } from './footer/footer.component';
import { ProductoComponent } from './producto/producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './servicio/CartService';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe/filterPipe';
import { Carrito } from './carrito/carrito.component';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './registrar/registrar.component';
@NgModule({
  declarations: [
    AppComponent,
    Footer,
    ProductoComponent,
    Carrito,
    LoginComponent,
    RegistrarComponent,
    FilterPipe

  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [CartService,],
  bootstrap: [AppComponent,Footer],

})
export class AppModule { }
