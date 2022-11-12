import { Component, OnInit, Input, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, Usuario } from '../servicio/LoginService';
import swal from 'sweetalert2';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {

  constructor(
    private router:Router, 
    private login:LoginService
  ){}

    email: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
    alerta: string = '';
    ngOnInit(): void {
    }

    signUp(){
      let usuario:Usuario;
      usuario = {
        username:this.email,
        password:this.password,
        email:this.email,
        nombre:this.nombre,
        apellido:this.apellido,
        direccion:this.direccion
      }
      
      this.login.signUp(usuario).subscribe(); 

      swal.fire('Se registro correctamenta, por favor verifica tu email' , this.alerta, 'success');
      this.router.navigate(['login']);
  }

}
