import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario{ username:string, password:string,email:string,nombre:string,apellido:string,direccion:string}

@Injectable({providedIn:'root'})
export class LoginService{
   url = '/api/login';

    constructor(private http:HttpClient){
    }

    signUp(usuario:Usuario):Observable<any>{
        return this.http.post<Usuario>(this.url, usuario);
    }
}