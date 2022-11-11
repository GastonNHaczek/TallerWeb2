import { Component, OnInit, Input, inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Auth} from 'aws-amplify';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string='';
  password: string = '';

  constructor(private router:Router){};

  ngOnInit(): void {
  }

  async loginWithCognito(){
    try{
      var user=await Auth.signIn(this.email.toString(), this.password.toString());
      console.log('Authentication performed for used=' + this.email + 'password=' + this.password)
      var tokens = user.signInUserSession;
      if (tokens != null){
        console.log('User authenticated');

        this.router.navigate(['home']);
        alert('You are logged in successfully!');
      }
    }catch (error){
      console.log(error);
      alert('User Authentication failed');
    }
  }
  irRegistrar(){
    console.log('ejecutando redirect');
 
    this.router.navigate(['/registrar']);
  }
}
