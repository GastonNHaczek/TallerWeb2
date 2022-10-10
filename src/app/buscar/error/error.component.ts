import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductoService } from 'src/app/servicio/producto.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {

  texto = '';
  mostrar = false;
  suscripcion: Subscription;

  constructor(private _productoService: ProductoService) {
    this.suscripcion = this._productoService.getError().subscribe(data => {
      this.mostrarMensaje();
      this.texto = data;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  mostrarMensaje(): void {  
    this.mostrar = true;
    setTimeout(() => {
    this.mostrar = false;
    }, 2000); 
  }

}
