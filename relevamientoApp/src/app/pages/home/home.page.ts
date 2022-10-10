import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { IonContent, ToastController } from '@ionic/angular';
import { ImagenesService } from 'src/app/services/imagenesService/imagenes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonContent) content: IonContent;
  opcion:number = 0;
  cargando:boolean = false;
  index : any;
  perfil : number = 0;
  eleccion : boolean = false;
  constructor(public ruteo: Router, public authService: AuthService, private imageStore : ImagenesService, private ts : ToastController) {}

  cargarPerfil(dato : number)
  {
    switch(dato)
    {
        case 1:
          this.perfil = 1;
          this.eleccion = true;
          break;

        case 2:
          this.perfil = 2;
          this.eleccion = true;
          break;

        case 0:
          this.perfil = 0;
          break;
    }
  }

  volverInicio()
  {
    this.opcion = 0;
    this.perfil =0;
  }

  mostrarCosasLindas()
  {
    this.opcion = 1;
  }

  mostrarCosasFeas()
  {
    this.opcion = 2;
  }

  mostrarGraficos(){
    this.opcion = 3;
  }

  logout(){
    this.opcion=0;
    this.perfil=0;
    this.authService.logout();
    this.ruteo.navigateByUrl('login');
  }

  scrollToTop() {
    this.content.scrollToTop(300);
  }

  subirFoto()
  {
    let hora = new Date();
  
    let foto : any = {
      pathFoto : "",
      email : this.authService.actualEmail,
      hora : hora.getFullYear(),
      likes : []
    } 
    
    this.imageStore.addNewToGallery(foto, this.opcion).then((data) =>{
      this.scrollToTop();
      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
      }, 8000);
    });
    
  }

  MostrarToast(message : string)
  {
    return this.ts.create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
            position: 'top'
    });
  }
}


