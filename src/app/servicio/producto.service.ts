import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private $error = new Subject<string>();
  private $busqueda = new Subject<string>();

  constructor(private http: HttpClient) { }

  setError(mensaje: string) { 
    this.$error.next(mensaje); 
  }

  getError(): Observable<string> { 
    return this.$error.asObservable();
  }

  busqueda(busqueda: string) {
    this.$busqueda.next(busqueda);
  }

  getBusqueda(): Observable<string> { 
    return  this.$busqueda.asObservable(); 
  }

  getProducto(busqueda: string): Observable<any> {
    return this.http.get(busqueda);
  }
}
