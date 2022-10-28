import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Footer } from './footer/footer.component';
//import { BuscarProductoComponent } from './producto/buscar/buscar/buscar-producto.component;
import { ProductoComponent } from './producto/producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartService } from './servicio/CartService';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    Footer,
    ProductoComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    CommonModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent,Footer]
})
export class AppModule { }
