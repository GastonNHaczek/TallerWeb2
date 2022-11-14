import { Component, OnInit, Input, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Auth} from 'aws-amplify';
import {FormsModule} from '@angular/forms';
import { LoginService, Usuario, UsuarioLogin } from '../servicio/LoginService';

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

  ngOnInit(): void {
  }

  login(){
    let usuarioLogin:UsuarioLogin;
    usuarioLogin = {
      username:this.email,
      password:this.password
    };
    this.loginService.login(usuarioLogin).subscribe(); 
    this.router.navigate(['home']);
  }

  irRegistrar(){
    this.router.navigate(['registrar']);
  }
}
