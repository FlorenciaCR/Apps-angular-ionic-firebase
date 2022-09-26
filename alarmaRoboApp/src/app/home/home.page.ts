import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService/auth.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  alarmOnOff: boolean = false;
  showDialog: boolean = false;
  estado = '';
  clave: string = "";
  //Sonidos
  audioIzquierda = "../../assets/audios/queEstasPorHAcer.wav";
  audioDerecha = "../../assets/audios/hurtandoDispisitivo.wav";
  audioVertical = "../../assets/audios/bajame.wav";
  audioHorizontal = "../../assets/audios/malardo.wav";
  audioError = "../../assets/audios/esaNoEsLaClave.wav";
  audio = new Audio();

  subscription: any;
  //Ingresos para flash
  primerIngreso: boolean = true;
  primerIngresoFlash: boolean = true;

  //ORIENTACION
  posicionActualCelular = 'actual';
  posicionAnteriorCelular = 'anterior';

  mostrarDialog: boolean = true;



  // Inclinacion
  accelerationX: any;
  accelerationY: any;
  accelerationZ: any;
  constructor(public ruteo: Router, public authService: AuthService, public screenOrientation: ScreenOrientation, public deviceMotion: DeviceMotion, private vibration: Vibration, private flashlight: Flashlight) { }


  cambiarAlarma() {
    if (this.alarmOnOff == true) {
      this.checkPassword();
    }
    else {
      this.alarmOnOff = true;
      this.comenzar();
    }
  }

  parar() {
    this.mostrarDialog = true;
    this.primerIngreso = true;
    this.subscription.unsubscribe();
  }

  comenzar() {
    this.subscription = this.deviceMotion.watchAcceleration({ frequency: 300 }).subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accelerationX = Math.floor(acceleration.x);
      this.accelerationY = Math.floor(acceleration.y);
      this.accelerationZ = Math.floor(acceleration.z);

      if (acceleration.x > 5) {
        //Inclinacion Izquierda

        this.posicionActualCelular = 'izquierda';
        this.movimientoIzquierda();
      }
      else if (acceleration.x < -5) {
        //Inclinacion Derecha

        this.posicionActualCelular = 'derecha';
        this.movimientoDerecha();
      }
      else if (acceleration.y >= 9) {
        //encender flash por 5 segundos y sonido
        this.posicionActualCelular = 'arriba';

        if ((this.posicionActualCelular != this.posicionAnteriorCelular)) {
          this.audio.src = this.audioVertical;
          this.posicionAnteriorCelular = 'arriba';
        }
        this.audio.play();
        this.movimientoVertical();
      }

      else if (acceleration.z >= 9 && (acceleration.y >= -1 && acceleration.y <= 1) && (acceleration.x >= -1 && acceleration.x <= 1)) {
        //acostado vibrar por 5 segundos y sonido
        this.posicionActualCelular = 'plano';
        this.movimientoHorizontal();
      }


    });
  }


  movimientoIzquierda() {
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if (this.posicionActualCelular != this.posicionAnteriorCelular) {
      this.posicionAnteriorCelular = 'izquierda';
      this.audio.src = this.audioIzquierda;
    }
    this.audio.play();
  }

  movimientoDerecha() {
    this.primerIngreso = false;
    this.primerIngresoFlash = true;
    if (this.posicionActualCelular != this.posicionAnteriorCelular) {
      this.posicionAnteriorCelular = 'derecha';
      this.audio.src = this.audioDerecha;
    }
    this.audio.play();
  }

  movimientoVertical() {
    if (this.primerIngresoFlash) {
      this.primerIngresoFlash ? this.flashlight.switchOn() : null;
      setTimeout(() => {
        this.primerIngresoFlash = false;
        this.flashlight.switchOff();
      }, 5000);
      this.primerIngreso = false;
    }
  }

  movimientoHorizontal() {
    if (this.posicionActualCelular != this.posicionAnteriorCelular) {
      this.posicionAnteriorCelular = 'plano';
      this.audio.src = this.audioHorizontal;
    }
    this.primerIngreso ? null : this.audio.play();
    this.primerIngreso ? null : this.vibration.vibrate(5000);
    this.primerIngreso = true;
    this.primerIngresoFlash = true;
  }

  errorApagado() {
    if (this.primerIngresoFlash) {
      this.primerIngresoFlash ? this.flashlight.switchOn() : null;
      this.audio.src = this.audioError;
      this.audio.play();
      this.vibration.vibrate(5000);
      setTimeout(() => {
        this.primerIngresoFlash = false;
        this.flashlight.switchOff();
        this.vibration.vibrate(0);
      }, 5000);
    }
  }

  async checkPassword() {
    const { value: password } = await Swal.fire({
      title: 'Ingrese la clave 👀',
      input: 'password',
      icon: 'warning',
      inputLabel: '',
      inputPlaceholder: 'Clave 🧐',
      heightAuto: false
    });
    this.clave = password;
    if (this.clave == this.authService.actualPassword) {//Comparacion de usuario registrado con la clave ingresada recientemente
      console.log("ENTRE");
      this.estado = 'permitido';
      this.alarmOnOff = false;
      this.estado = "";
      this.clave = "";
      this.audio.pause();
      this.parar(); ///Paro la subscripcion al acceleration
    }
    else if (this.clave != '') {
      this.estado = 'denegado';
      this.errorApagado();
      setTimeout(() => {
        this.estado = "";
      }, 1000);

    }
    //Tambien hay que agregar la funcionalidad del login y demas.
  }

  logout() {
    this.authService.logout();
    this.ruteo.navigateByUrl('login');
  }
}
