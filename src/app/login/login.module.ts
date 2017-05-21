import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//  import { routing } from './login.routing';
import { Login } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import {LoginService} from './login.service';
import {ClientService} from '../app.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
   
    FormsModule,
  ],
  declarations: [
    Login
  ],
  providers:[LoginService,ClientService]
 
})
export class LoginModule { }