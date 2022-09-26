import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { FirestoreService } from 'src/app/services/firestoreService/firestore.service';

@Component({
  selector: 'app-chat4-a',
  templateUrl: './chat4-a.page.html',
  styleUrls: ['./chat4-a.page.scss'],
})
export class Chat4APage implements OnInit {
  today: Date;
  userLogged: any;
  nuevoMensaje: string = '';
  mensajes: any = [];
  listaUsuarios: any = [];
  usuarioActual: any;
  constructor(public router: Router, public authService: AuthService, public fireStoreService: FirestoreService) {
    this.authService.getUserLogged().subscribe(usuario => {
      this.userLogged = usuario;
    });
    this.fireStoreService.getCollectionWithId('Chat4A', "chatId").subscribe(
      chat => {
        this.mensajes = chat;
        this.mensajes.sort(function (elemento1: any, elemento2: any) {
          return elemento1.chatId - elemento2.chatId;
        });
        this.fireStoreService.getCollectionWithId('usuarios', "usuarioId").subscribe(
          resp => {
            this.listaUsuarios = resp;
            this.identificarUsuarioPorMail();
            this.autoScroll();
          });
      });
  }

  ngOnInit() {
    
  }

  enviarMensaje() {
    console.log(this.nuevoMensaje);
    this.today = new Date();
    let mensaje = {
      emisor: this.usuarioActual.usuarioId,
      usuario: this.usuarioActual.usuario,
      texto: this.nuevoMensaje,
      hora: this.today.toString(),
    }
    if (this.nuevoMensaje != '') {
      this.mensajes.push(mensaje);
      this.nuevoMensaje = '';
      this.autoScroll();
      this.fireStoreService.addToChat(mensaje, this.mensajes.length, "4A");
    }
  }

  identificarUsuarioPorMail() {
    for (let i = 0; i < this.listaUsuarios.length; i++) {

      if (this.userLogged.email == this.listaUsuarios[i].correo) {
        this.usuarioActual = this.listaUsuarios[i];
        break;
      }
    }
  }

  autoScroll() {
    setTimeout(function () {
        let itemList = document.getElementById("contenedorMensajes");
        itemList.scrollTop = itemList.scrollHeight;
    }, 10);
  }

}