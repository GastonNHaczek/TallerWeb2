import { HttpClient } from '@angular/common/http';

export interface Usuario{ username:string, password:string,email:string,nombre:string,apellido:string,direccion:string}


export class LoginService{
    url = '/registrar';

    constructor(private http:HttpClient){
    }

    signUp(usuario:Usuario){
        return this.http.post(this.url, usuario);
    }
}