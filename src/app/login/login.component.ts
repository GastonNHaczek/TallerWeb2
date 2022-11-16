import { Component, OnInit, Input, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, UsuarioLogin } from '../servicio/LoginService';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  constructor(
    private router:Router,
    private loginService:LoginService
  ){};
    
  email: string='';
  password: string = '';
  alerta: string = '';

  ngOnInit(): void {}

  login() {
    let usuarioLogin:UsuarioLogin;
      usuarioLogin = {
      username:this.email,
      password:this.password
    };

    this.loginService.login(usuarioLogin).subscribe(res => {
      if(res.status == 401) {
        this.router.navigate(['login']);
        swal.fire('Email o Contraseña incorrecta', this.alerta, 'error');
      }
      else {
        console.log(res);
        this.router.navigate(['home']);
      }
    }); 
  }

  irRegistrar(){
    this.router.navigate(['registrar']);
  }
}
