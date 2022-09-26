import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  errorMessage: string = "";
  mostrarError = false;

  user = {
    email: '',
    password: ''
  }
  
  constructor(public fb: FormBuilder,public ruteo: Router, public authService: AuthService, private toastController: ToastController) { 
    this.formLogin = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  loguearse(){
    try {
      const email = this.formLogin.getRawValue().email;
      const password = this.formLogin.getRawValue().password;
      this.authService.login(email, password)
        .then(
          res => {
            if (res == null) {
              console.log("error al logearse", res);
            } else {
              console.log("ingreso!: ", res);
              this.mostrarError = false;
              this.ruteo.navigateByUrl('home');
              this.formLogin.reset();
            }
          })
        .catch((error: any) => {
          switch (error.code) {
            case 'auth/invalid-email':
              this.errorMessage = 'Email invalido.';
              this.mostrarError = true;
              break;
            case 'auth/user-disabled':
              this.errorMessage = 'Usuario deshabilitado.';
              this.mostrarError = true;
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'Usuario no encontrado.';
              this.mostrarError = true;
              break;
            case 'auth/wrong-password':
              this.errorMessage = 'Contraseña incorrecta.';
              this.mostrarError = true;
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'Usuario no encontrado.';
              this.mostrarError = true;
              break;
            default:
              this.errorMessage = 'Error';
              this.mostrarError = true;
              break;
          }
        });
    } catch (error) {
      console.log("Error al ingresar", error);
    }
  }

  logeoAutomatico(email:string,password:string){
    this.formLogin.controls['email'].setValue(email);
    this.formLogin.controls['password'].setValue(password);
    this.loguearse();
  }

  esconderError(){
    this.mostrarError = false;
    this.errorMessage = "";
  }


}
