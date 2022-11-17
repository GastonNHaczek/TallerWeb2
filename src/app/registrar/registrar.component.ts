import { Component, OnInit, Input, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService, Usuario } from '../servicio/LoginService';
import swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {

  constructor(
    private router:Router, 
    private login:LoginService,
    private formBuilder: FormBuilder
  ){
    this.registerForm = this.createForm();
  }

    email: string;
    password: string;
    nombre: string;
    apellido: string;
    direccion: string;
    alerta: string = '';
    validations: any;
    errorMessage: string = 'Errores';
    message: any;
    registerForm: FormGroup;

    ngOnInit(): void {
    }

    get name() { return this.registerForm.get('name'); }
    get surname() {return this.registerForm.get('surname'); }
    get address() { return this.registerForm.get('address'); }
    get correo() { return this.registerForm.get('correo'); }
    get pass() { return this.registerForm.get('pass'); }

    createForm() {
      return new FormGroup({
        correo: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required, Validators.minLength(5)]),
        surname: new FormControl('', [Validators.required, Validators.minLength(5)]),
        pass: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[A-Z]{1}[a-z0-9]*')]),
        address: new FormControl('', [Validators.required, Validators.minLength(5)])
      });
    }

    validateForm() {
      if(!this.registerForm.valid) {
        swal.fire('Formulario invalido', this.alerta, 'error');
      }
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
      };
      this.login.signUp(usuario).subscribe(res => {
        if(res.code == 'UsernameExistsException') {
          swal.fire('El email ingresado ya existe.' , this.alerta, 'error');
          this.router.navigate(['login']);
        }
        else {
          swal.fire('Se registro correctamenta, por favor verifica tu email' , this.alerta, 'success');
          this.router.navigate(['login']);
        }
      }); 
  }
}
