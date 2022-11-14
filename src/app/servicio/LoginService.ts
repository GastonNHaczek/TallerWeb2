import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario { 
    username: string, 
    password: string,
    email: string,
    nombre: string,
    apellido: string,
    direccion: string
}
export interface UsuarioLogin{
    username:string,
    password:string
}
@Injectable({providedIn:'root'})
export class LoginService{
    
    constructor(
        private http: HttpClient
    ){}
    
    signUp(usuario:Usuario) :Observable<any> {
        let url = '/api/registrar';
        return this.http.post<Usuario>(url, usuario);
    }

    login(usuarioLogin:UsuarioLogin) :Observable<any> {
        let url ='/api/login';
        return this.http.post<UsuarioLogin>(url, usuarioLogin);
    }
}