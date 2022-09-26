import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { ToastController } from '@ionic/angular';
import { MatCheckboxChange } from '@angular/material/checkbox';

//import { Key } from 'protractor';
//import {ThemePalette} from '@angular/material/core';
//import { $ } from 'protractor';
//import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  errorMessage: string = "";
  mostrarError = false;
  perfiles: string[] = ['Administrador', 'Anónimo', 'Casual'];
  checkedInvi : boolean = false;
  checkedAdmin : boolean = false;
  checkedAnoni : boolean = false;

  private checked_usuario:boolean;
  private checked_admin:boolean;
  private checked_invitado:boolean;

  user = {
    email: '',
    password: ''
  }

  constructor(public fb: FormBuilder, public ruteo: Router, public authService: AuthService, private toastController: ToastController) {
    this.checked_usuario = false;
    this.checked_admin = false;
    this.checked_invitado = false;

    this.formLogin = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]],
    });
  }

  ngOnInit() { }

  logs: string[] = [];

  cargarDatos(dato : number)
  {
    switch(dato)
    {
        case 1:
          this.user.email = "usuario@usuario.com";
          this.user.password = "333333";
          this.formLogin.get('email')?.setValue(this.user.email);
          this.formLogin.get('password')?.setValue(this.user.password);
          this.logeoAutomatico('usuario@usuario.com', '333333');
          break;
        case 2:
          this.user.email = "invitado@invitado.com";
          this.user.password = "222222";
          this.formLogin.get('email')?.setValue(this.user.email);
          this.formLogin.get('password')?.setValue(this.user.password);
          this.logeoAutomatico('invitado@invitado.com', '222222');
          break;
        case 3:
          this.user.email = "admin@admin.com";
          this.user.password = "111111";
          this.formLogin.get('email')?.setValue(this.user.email);
          this.formLogin.get('password')?.setValue(this.user.password);
          this.logeoAutomatico('admin@admin.com', '111111');
          break;
    }
  }

    // handleChange(e) {
  //   switch (e.detail.value) {
  //     case 'usuario1':
  //       this.logeoAutomatico('admin@admin.com', '111111');
  //       break;
  //     case 'usuario2':
  //       this.logeoAutomatico('invitado@invitado.com', '222222')
  //       break;
  //     case 'usuario3':
  //       this.logeoAutomatico('usuario@usuario.com', '333333')
  //       break;
  //   }
  // }

  onChangeAdmin(ob: MatCheckboxChange) 
  {
    if(ob.checked)
    {
      this.checkedAdmin = true;
      this.checkedAnoni = false;
      this.checkedInvi = false;
      this.cargarDatos(3);
    }
    else
    {
      this.checkedAdmin = false;
      this.user.email = "";
      this.user.password = "";
      this.formLogin.get('email')?.setValue(this.user.email);
      this.formLogin.get('password')?.setValue(this.user.password);
    }
  }

  onChangeAnonimo(ob: MatCheckboxChange) 
  {
    if(ob.checked)
    {
      this.checkedAnoni = true;
      this.checkedInvi = false;
      this.checkedAdmin = false;

      this.cargarDatos(1);
    }
    else
    {
      this.checkedAnoni = false;
      this.user.email = "";
      this.user.password = "";
      this.formLogin.get('email')?.setValue(this.user.email);
      this.formLogin.get('password')?.setValue(this.user.password);
    }
  }

  onChangeInvitado(ob: MatCheckboxChange) 
  {
    if(ob.checked)
    {
      this.checkedInvi = true;
      this.checkedAnoni = false;
      this.checkedAdmin = false;
      
      this.cargarDatos(2);
    }
    else
    { 
      this.checkedInvi = false;
      this.user.email = "";
      this.user.password = "";
      this.formLogin.get('email')?.setValue(this.user.email);
      this.formLogin.get('password')?.setValue(this.user.password);
    }
  }






  loguearse() {
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
              break;
            case 'auth/user-disabled':
              this.errorMessage = 'Usuario deshabilitado.';
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'Usuario no encontrado.';
              break;
            case 'auth/wrong-password':
              this.errorMessage = 'Contraseña incorrecta.';
              break;
            case 'auth/user-not-found':
              this.errorMessage = 'Usuario no encontrado.';
              break;
            default:
              this.errorMessage = 'Error';
              break;
          }
          this.presentToast('top', 'medium');
        });
    } catch (error) {
      console.log("Error al ingresar", error);
    }
  }

  logeoAutomatico(email: string, password: string) {
    this.formLogin.controls['email'].setValue(email);
    this.formLogin.controls['password'].setValue(password);
    this.loguearse();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', color: 'primary' | 'light' | 'medium') {
    const toast = await this.toastController.create({
      message: this.errorMessage,
      position: position,
      color: color,
      icon: 'key',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        }]
    });

    await toast.present();
  }

}

