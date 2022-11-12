import { Component, OnInit, Input, inject, Inject } from '@angular/core';
import {Auth} from 'aws-amplify';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, Usuario } from '../servicio/LoginService';
/*import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';*/


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  email:string;
  password:string;
  nombre:string;
  apellido:string;
  direccion:string;
  constructor(private router:Router, private login:LoginService,
    ) {
    
   }

  ngOnInit(): void {
  }
 /* async signUp(){
    try {
        const user  =  Auth.signUp({
      username:this.email,
      password:this.password,
      attributes:{
        email:this.email,
        nombre:this.nombre,
        apellido:this.apellido,
        direccion:this.direccion
      }
    });
    console.log({user});
      alert('User signup completed, please check verify your email');
      this.router.navigate(['login']);
  }catch(error){
    console.log('error registro:', error);
  }
  
}*/
signUp(){
  let usuario:Usuario;
  usuario={username:this.email,
    password:this.password,
    email:this.email,
    nombre:this.nombre,
    apellido:this.apellido,
    direccion:this.direccion}
  this.login.signUp(usuario).subscribe(); 

  console.log({usuario});
      alert('User signup completed, please check verify your email');
  this.router.navigate(['login']);

}

}
