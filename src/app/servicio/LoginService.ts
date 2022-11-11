import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Usuario{ username:string, password:string,email:string,nombre:string,apellido:string,direccion:string}

@Injectable({providedIn:'root'})
export class LoginService{
    url = '/api/login';

    constructor(private http:HttpClient){
    }

    signUp(usuario:Usuario){
        return this.http.post(this.url, usuario);
    }
}