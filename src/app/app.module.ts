import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from  '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Footer } from './footer/footer.component';
//import { BuscarProductoComponent } from './producto/buscar/buscar/buscar-producto.component;
import { ErrorComponent } from './buscar/error/error.component';
import { SpinnerComponent } from './buscar/spinner/spinner.component';
import { ProductoComponent } from './producto/producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    Footer,
    //BuscarProductoComponent,
    ErrorComponent,
    SpinnerComponent,
    ProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent,Footer]
})
export class AppModule { }
